// Сборка статики с basePath и публикация out/ в ветку gh-pages
import { execSync } from "node:child_process";
import fs from "node:fs";
const run = (c, o = {}) => execSync(c, { stdio: "inherit", ...o });
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "/lgr-group";
run("npm run build", { env: { ...process.env, NEXT_PUBLIC_BASE_PATH: base } });
fs.writeFileSync("out/.nojekyll", "");
const remote = execSync("git remote get-url origin").toString().trim();
run("git init -b gh-pages", { cwd: "out" });
run("git add -A", { cwd: "out" });
run('git -c user.name="deploy" -c user.email="deploy@lgr-group.ru" commit -q -m "deploy"', { cwd: "out" });
run(`git push --force "${remote}" gh-pages:gh-pages`, { cwd: "out" });
fs.rmSync("out/.git", { recursive: true, force: true });
console.log("Опубликовано в gh-pages");
