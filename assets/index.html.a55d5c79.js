import{r as l,o as i,c as d,d as n,w as s,F as p,e as c,a as e,b as a}from"./app.9958f85a.js";import{_ as u}from"./plugin-vue_export-helper.21dcd24c.js";const k={},h=c('<h1 id="\u8FC1\u79FB\u5230-v5-x" tabindex="-1"><a class="header-anchor" href="#\u8FC1\u79FB\u5230-v5-x" aria-hidden="true">#</a> \u8FC1\u79FB\u5230 v5.x</h1><h2 id="transform-api" tabindex="-1"><a class="header-anchor" href="#transform-api" aria-hidden="true">#</a> Transform API</h2><p>Transform API \u6CA1\u6709\u4EFB\u4F55\u53D8\u66F4\uFF0C\u4E0D\u9700\u8981\u505A\u8FC1\u79FB\u3002</p><h2 id="task-api" tabindex="-1"><a class="header-anchor" href="#task-api" aria-hidden="true">#</a> Task API</h2><h3 id="variantprocessor" tabindex="-1"><a class="header-anchor" href="#variantprocessor" aria-hidden="true">#</a> VariantProcessor</h3><p>\u5C06 <code>process</code> \u65B9\u6CD5\u4E2D\u7684 <code>BaseVariant</code> \u66FF\u6362\u4E3A <code>Variant</code>\uFF1A</p>',6),m=e("div",{class:"language-kotlin ext-kt line-numbers-mode"},[e("pre",{class:"language-kotlin"},[e("code",null,[e("span",{class:"token keyword"},"override"),a(),e("span",{class:"token keyword"},"fun"),a(),e("span",{class:"token function"},"process"),e("span",{class:"token punctuation"},"("),a("variant"),e("span",{class:"token operator"},":"),a(" BaseVariant"),e("span",{class:"token punctuation"},")"),a(),e("span",{class:"token punctuation"},"{"),a(`
    `),e("span",{class:"token comment"},"// ..."),a(`
`),e("span",{class:"token punctuation"},"}"),a(`
`)])]),e("div",{class:"line-numbers"},[e("span",{class:"line-number"},"1"),e("br"),e("span",{class:"line-number"},"2"),e("br"),e("span",{class:"line-number"},"3"),e("br")])],-1),b=e("div",{class:"language-kotlin ext-kt line-numbers-mode"},[e("pre",{class:"language-kotlin"},[e("code",null,[e("span",{class:"token keyword"},"override"),a(),e("span",{class:"token keyword"},"fun"),a(),e("span",{class:"token function"},"process"),e("span",{class:"token punctuation"},"("),a("variant"),e("span",{class:"token operator"},":"),a(" Variant"),e("span",{class:"token punctuation"},")"),a(),e("span",{class:"token punctuation"},"{"),a(`
    `),e("span",{class:"token comment"},"// ..."),a(`
`),e("span",{class:"token punctuation"},"}"),a(`
`)])]),e("div",{class:"line-numbers"},[e("span",{class:"line-number"},"1"),e("br"),e("span",{class:"line-number"},"2"),e("br"),e("span",{class:"line-number"},"3"),e("br")])],-1),f=c('<h2 id="gradle-compat" tabindex="-1"><a class="header-anchor" href="#gradle-compat" aria-hidden="true">#</a> Gradle Compat</h2><h3 id="agpinterface" tabindex="-1"><a class="header-anchor" href="#agpinterface" aria-hidden="true">#</a> AGPInterface</h3><p>\u5728 Booster 5.0.0 \u4E2D\uFF0C<code>AGPInterface</code> \u4E2D\u6240\u6709\u5E26 <code>BaseVariant</code> \u7684 API \u5DF2\u66FF\u6362\u4E3A <code>Variant</code>\uFF0C\u5E76\u5E9F\u5F03\u4E86\u4E00\u4E9B <code>Task</code> \u76F8\u5173\u7684 API\uFF0C\u867D\u7136\u6CA1\u6709\u5F7B\u5E95\u5220\u9664\uFF0C\u4F46\u4E0D\u5EFA\u8BAE\u4F7F\u7528\uFF0C\u57FA\u672C\u4E0A\u53EF\u4EE5\u8BA4\u4E3A\u662F\u4E0D\u53EF\u7528 -- \u8FD0\u884C\u65F6\u65E0\u6CD5\u83B7\u53D6\u5230 AGP \u7684 <code>Task</code></p><h3 id="project-extension" tabindex="-1"><a class="header-anchor" href="#project-extension" aria-hidden="true">#</a> Project Extension</h3><p>\u548C <code>AGPInterface</code> \u7C7B\u4F3C\uFF0C\u5C3D\u53EF\u80FD\u4FDD\u7559\u4E86 v4.x \u4E2D\u5B58\u5728\u7684 API\uFF0C\u5C06\u65B9\u6CD5\u4E2D\u7684 <code>BaseVariant</code> \u53C2\u6570\u66FF\u6362\u4E3A\u4E86 <code>Variant</code>\uFF0C\u4E2A\u522B\u65B9\u6CD5\u505A\u4E86\u91CD\u6784\u3002</p><h4 id="getandroid-getandroidornull" tabindex="-1"><a class="header-anchor" href="#getandroid-getandroidornull" aria-hidden="true">#</a> getAndroid / getAndroidOrNull</h4><p>\u5C06 <code>Project.getAndroid(...)</code> \u66FF\u6362\u4E3A <code>Project.getAndroidComponents()</code>\uFF1B\u5C06 <code>Project.getAndroidOrNull(...)</code> \u66FF\u6362\u4E3A <code>Project.getAndroidComponentsOrNull()</code>\uFF1A</p>',7),v=e("div",{class:"language-kotlin ext-kt line-numbers-mode"},[e("pre",{class:"language-kotlin"},[e("code",null,[e("span",{class:"token keyword"},"val"),a(" android "),e("span",{class:"token operator"},"="),a(" getAndroidOrNull"),e("span",{class:"token operator"},"<"),a("BaseExtension"),e("span",{class:"token operator"},">"),e("span",{class:"token punctuation"},"("),e("span",{class:"token punctuation"},")"),a(`
`)])]),e("div",{class:"line-numbers"},[e("span",{class:"line-number"},"1"),e("br")])],-1),g=e("div",{class:"language-kotlin ext-kt line-numbers-mode"},[e("pre",{class:"language-kotlin"},[e("code",null,[e("span",{class:"token keyword"},"val"),a(" androidComponents "),e("span",{class:"token operator"},"="),a(" getAndroidComponentsOrNull"),e("span",{class:"token operator"},"<"),a("AndroidComponentsExtension"),e("span",{class:"token operator"},"<"),e("span",{class:"token operator"},"*"),e("span",{class:"token punctuation"},","),a(),e("span",{class:"token operator"},"*"),e("span",{class:"token punctuation"},","),a(),e("span",{class:"token operator"},"*"),e("span",{class:"token operator"},">"),e("span",{class:"token operator"},">"),e("span",{class:"token punctuation"},"("),e("span",{class:"token punctuation"},")"),a(`
`)])]),e("div",{class:"line-numbers"},[e("span",{class:"line-number"},"1"),e("br")])],-1),_=e("h4",{id:"getresolvedartifactresults",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#getresolvedartifactresults","aria-hidden":"true"},"#"),a(" getResolvedArtifactResults")],-1),x=e("p",null,[a("\u5C06 "),e("code",null,"Project.getResolvedArtifactResults(...)"),a(" \u65B9\u6CD5\u4E2D\u7684 variant \u66FF\u6362\u4E3A filter\uFF1A")],-1),A=e("div",{class:"language-kotlin ext-kt line-numbers-mode"},[e("pre",{class:"language-kotlin"},[e("code",null,[e("span",{class:"token keyword"},"val"),a(" result"),e("span",{class:"token operator"},":"),a(" Set"),e("span",{class:"token operator"},"<"),a("ResolvedArtifactResult"),e("span",{class:"token operator"},">"),a(),e("span",{class:"token operator"},"="),a(" project"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"getResolvedArtifactResults"),e("span",{class:"token punctuation"},"("),a(`
    `),e("span",{class:"token boolean"},"true"),e("span",{class:"token punctuation"},","),a(`
    variant
`),e("span",{class:"token punctuation"},")"),a(`
`)])]),e("div",{class:"line-numbers"},[e("span",{class:"line-number"},"1"),e("br"),e("span",{class:"line-number"},"2"),e("br"),e("span",{class:"line-number"},"3"),e("br"),e("span",{class:"line-number"},"4"),e("br")])],-1),P=e("div",{class:"language-kotlin ext-kt line-numbers-mode"},[e("pre",{class:"language-kotlin"},[e("code",null,[e("span",{class:"token keyword"},"val"),a(" result"),e("span",{class:"token operator"},":"),a(" Set"),e("span",{class:"token operator"},"<"),a("ResolvedArtifactResult"),e("span",{class:"token operator"},">"),a(),e("span",{class:"token operator"},"="),a(" project"),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"getResolvedArtifactResults"),e("span",{class:"token punctuation"},"("),a(`
    `),e("span",{class:"token boolean"},"true"),e("span",{class:"token punctuation"},","),a(`
    variant`),e("span",{class:"token punctuation"},"."),e("span",{class:"token function"},"filterByNameOrBuildType"),e("span",{class:"token punctuation"},"("),e("span",{class:"token punctuation"},")"),a(`
`),e("span",{class:"token punctuation"},")"),a(`
`)])]),e("div",{class:"line-numbers"},[e("span",{class:"line-number"},"1"),e("br"),e("span",{class:"line-number"},"2"),e("br"),e("span",{class:"line-number"},"3"),e("br"),e("span",{class:"line-number"},"4"),e("br")])],-1);function B(V,C){const t=l("Badge"),o=l("CodeGroupItem"),r=l("CodeGroup");return i(),d(p,null,[h,n(t,{text:"v4.x"}),n(r,null,{default:s(()=>[n(o,{title:"Kotlin",active:""},{default:s(()=>[m]),_:1})]),_:1}),n(t,{text:"v5.x"}),n(r,null,{default:s(()=>[n(o,{title:"Kotlin",active:""},{default:s(()=>[b]),_:1})]),_:1}),f,n(t,{text:"v4.x"}),n(r,null,{default:s(()=>[n(o,{title:"Kotlin",active:""},{default:s(()=>[v]),_:1})]),_:1}),n(t,{text:"v5.x"}),n(r,null,{default:s(()=>[n(o,{title:"Kotlin",active:""},{default:s(()=>[g]),_:1})]),_:1}),_,x,n(t,{text:"v4.x"}),n(r,null,{default:s(()=>[n(o,{title:"Kotlin",active:""},{default:s(()=>[A]),_:1})]),_:1}),n(t,{text:"v5.x"}),n(r,null,{default:s(()=>[n(o,{title:"Kotlin",active:""},{default:s(()=>[P]),_:1})]),_:1})],64)}var j=u(k,[["render",B]]);export{j as default};