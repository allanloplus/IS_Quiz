#!/usr/bin/env node
/* 將題庫匯出成 Markdown 對照表（docs/question-bank.md），方便講師逐題審閱。
   用法：node tools/export-questions.js */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['data.js', 'questions-standard.js', 'questions-ai.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'js', f), 'utf8'), ctx, { filename: f });
}
const D = ctx.window.AIT_DATA;
const CAT = Object.fromEntries(D.categories.map(c => [c.id, c]));
const L = ['A', 'B', 'C', 'D'];

const out = ['# Allan\'S IT知識測驗：題庫總覽', '',
  `共 ${D.questions.length} 題（標準 30 題＋AI 生成 70 題）。本檔由 \`node tools/export-questions.js\` 產生，請勿手動編輯；修改題目請改 \`js/questions-*.js\`。`, ''];
out.push('| 類別 | 標準 | AI | 合計 |', '|---|---:|---:|---:|');
for (const id of D.route) {
  const qs = D.questions.filter(q => q.cat === id);
  out.push(`| ${CAT[id].zh} | ${qs.filter(q => q.src === 'std').length} | ${qs.filter(q => q.src === 'ai').length} | ${qs.length} |`);
}
for (const src of ['std', 'ai']) {
  out.push('', src === 'std' ? '## 標準 30 題' : '## AI 生成 70 題', '');
  for (const q of D.questions.filter(x => x.src === src)) {
    out.push(`### ${q.id}｜${CAT[q.cat].zh}｜難度 ${'★'.repeat(q.lv)}`, '', `**${q.q}**`, '', q.qz, '');
    q.o.forEach((o, i) => out.push(`- ${L[i]}. ${o}　／　${q.oz[i]}${i === q.a ? '　**← 正確答案**' : ''}`));
    out.push('', `**解說：** ${q.ez}`, '', `*Explanation:* ${q.ee}`, '');
    if (q.iso.length) out.push(`**ISO/IEC 27001:2022 附錄 A：** ${q.iso.map(c => `A.${c} ${D.iso[c][0]}（${D.iso[c][1]}）`).join('；')}`, '');
    if (q.tip) out.push(`**稽核小叮嚀：** ${q.tip}`, '');
  }
}
fs.writeFileSync(path.join(root, 'docs', 'question-bank.md'), out.join('\n') + '\n');
console.log(`wrote docs/question-bank.md (${D.questions.length} questions)`);
