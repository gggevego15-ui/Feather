import { readFile, writeFile } from "node:fs/promises";

const manifestPath = "android/app/src/main/AndroidManifest.xml";
let manifest = await readFile(manifestPath, "utf8");
const mediaPermissions = [
  "android.permission.CAMERA",
  "android.permission.RECORD_AUDIO",
  "android.permission.MODIFY_AUDIO_SETTINGS"
];
for (const permission of mediaPermissions) {
  const declaration = `<uses-permission android:name="${permission}" />`;
  if (!manifest.includes(declaration)) {
    const applicationStart = manifest.indexOf("<application");
    if (applicationStart < 0) throw new Error("Could not find application in AndroidManifest.xml");
    manifest = manifest.slice(0, applicationStart) + "    " + declaration + "\\n    " + manifest.slice(applicationStart);
  }
}
for (const feature of ['android.hardware.camera', 'android.hardware.microphone']) {
  const declaration = `<uses-feature android:name="${feature}" android:required="false" />`;
  if (!manifest.includes(declaration)) {
    const applicationStart = manifest.indexOf("<application");
    manifest = manifest.slice(0, applicationStart) + "    " + declaration + "\\n    " + manifest.slice(applicationStart);
  }
}
if (!manifest.includes('android:scheme="feather"')) {
  const activityClose = manifest.indexOf("</activity>");
  if (activityClose < 0) throw new Error("Could not find MainActivity in AndroidManifest.xml");
  const filter = `
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="feather" android:host="auth" />
            </intent-filter>
`;
  manifest = manifest.slice(0, activityClose) + filter + manifest.slice(activityClose);
  await writeFile(manifestPath, manifest, "utf8");
}
console.log("Configured feather://auth Android deep links");
