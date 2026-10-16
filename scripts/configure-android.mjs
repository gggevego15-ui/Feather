import { readFile, writeFile } from "node:fs/promises";

const manifestPath = "android/app/src/main/AndroidManifest.xml";
let manifest = await readFile(manifestPath, "utf8");
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
