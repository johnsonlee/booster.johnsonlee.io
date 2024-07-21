import{r as t,o as r,c as p,a as n,b as s,d as a,w as o,F as u,e as c}from"./app.9958f85a.js";import{_ as k}from"./plugin-vue_export-helper.21dcd24c.js";const d={},b=n("h1",{id:"\u5FEB\u901F\u4E0A\u624B-\u8FDB\u9636\u7248",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5FEB\u901F\u4E0A\u624B-\u8FDB\u9636\u7248","aria-hidden":"true"},"#"),s(" \u5FEB\u901F\u4E0A\u624B\uFF08\u8FDB\u9636\u7248\uFF09")],-1),m=n("h2",{id:"\u65E0\u4FB5\u5165\u96C6\u6210",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u65E0\u4FB5\u5165\u96C6\u6210","aria-hidden":"true"},"#"),s(" \u65E0\u4FB5\u5165\u96C6\u6210")],-1),g=n("em",null,"Gradle",-1),_={href:"https://docs.gradle.org/current/userguide/init_scripts.html",target:"_blank",rel:"noopener noreferrer"},h=n("em",null,"Booster",-1),f=n("em",null,"CI",-1),v=n("em",null,"Gradle",-1),x={href:"https://docs.gradle.org/current/userguide/init_scripts.html",target:"_blank",rel:"noopener noreferrer"},y=n("code",null,"-I",-1),I=n("code",null,"--init-script",-1),C={href:"https://docs.gradle.org/current/userguide/init_scripts.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://docs.gradle.org/current/userguide/init_scripts.html",target:"_blank",rel:"noopener noreferrer"},j=c("<li><em>Gradle</em> \u76EE\u5F55 <ul><li>\u5728 <code>USER_HOME/.gradle/</code> \u76EE\u5F55\u4E0B\u914D\u7F6E <code>init.gradle</code> \u6587\u4EF6</li><li>\u5728 <code>USER_HOME/.gradle/init.d/</code> \u76EE\u5F55\u4E0B\u914D\u7F6E\u6269\u5C55\u540D\u4E3A <code>.gradle</code> \u7684\u6587\u4EF6\uFF08<em>Kotlin</em> \u5219\u4E3A <code>.init.gradle.kts</code>\uFF09</li><li>\u5728 <code>USER_HOME/init.d/</code> \u76EE\u5F55\u4E0B\u914D\u7F6E\u6269\u5C55\u540D\u4E3A <code>.gradle</code> \u7684\u6587\u4EF6\uFF08<em>Kotlin</em> \u5219\u4E3A <code>.init.gradle.kts</code>\uFF09</li></ul></li>",1),S=n("p",null,[s("\u4EE5\u7EBF\u7A0B\u4F18\u5316\u4E3A\u4F8B\uFF0C\u5728\u5DE5\u7A0B\u6839\u76EE\u5F55\u521B\u5EFA "),n("code",null,"init.gradle"),s(" \u6587\u4EF6\uFF0C\u5176\u5185\u5BB9\u5982\u4E0B\uFF1A")],-1),G=n("div",{class:"language-groovy ext-groovy line-numbers-mode"},[n("pre",{class:"language-groovy"},[n("code",null,[s("allprojects "),n("span",{class:"token punctuation"},"{"),s(" project "),n("span",{class:"token operator"},"->"),s(`
    buildscript `),n("span",{class:"token punctuation"},"{"),s(`
        ext`),n("span",{class:"token punctuation"},"."),s("booster_version "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token interpolation-string"},[n("span",{class:"token string"},'"5.0.0"')]),s(`
        repositories `),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token function"},"google"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
            `),n("span",{class:"token function"},"mavenCentral"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        dependencies `),n("span",{class:"token punctuation"},"{"),s(`
            classpath `),n("span",{class:"token interpolation-string"},[n("span",{class:"token string"},'"com.didiglobal.booster:booster-gradle-plugin:'),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"$"),n("span",{class:"token expression"},"booster_version")]),n("span",{class:"token string"},'"')]),s(`
            classpath `),n("span",{class:"token interpolation-string"},[n("span",{class:"token string"},'"com.didiglobal.booster:booster-transform-thread:'),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"$"),n("span",{class:"token expression"},"booster_version")]),n("span",{class:"token string"},'"')]),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    repositories `),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"google"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token function"},"mavenCentral"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    project`),n("span",{class:"token punctuation"},"."),s("afterEvaluate "),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("project"),n("span",{class:"token punctuation"},"."),s("extensions"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"findByName"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},"'android'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"!="),s(" null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            project`),n("span",{class:"token punctuation"},"."),s("apply plugin"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},"'com.didiglobal.booster'"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers"},[n("span",{class:"line-number"},"1"),n("br"),n("span",{class:"line-number"},"2"),n("br"),n("span",{class:"line-number"},"3"),n("br"),n("span",{class:"line-number"},"4"),n("br"),n("span",{class:"line-number"},"5"),n("br"),n("span",{class:"line-number"},"6"),n("br"),n("span",{class:"line-number"},"7"),n("br"),n("span",{class:"line-number"},"8"),n("br"),n("span",{class:"line-number"},"9"),n("br"),n("span",{class:"line-number"},"10"),n("br"),n("span",{class:"line-number"},"11"),n("br"),n("span",{class:"line-number"},"12"),n("br"),n("span",{class:"line-number"},"13"),n("br"),n("span",{class:"line-number"},"14"),n("br"),n("span",{class:"line-number"},"15"),n("br"),n("span",{class:"line-number"},"16"),n("br"),n("span",{class:"line-number"},"17"),n("br"),n("span",{class:"line-number"},"18"),n("br"),n("span",{class:"line-number"},"19"),n("br"),n("span",{class:"line-number"},"20"),n("br"),n("span",{class:"line-number"},"21"),n("br"),n("span",{class:"line-number"},"22"),n("br")])],-1),B=n("div",{class:"language-kotlin ext-kt line-numbers-mode"},[n("pre",{class:"language-kotlin"},[n("code",null,[s("allprojects "),n("span",{class:"token punctuation"},"{"),s(" project "),n("span",{class:"token operator"},"->"),s(`
    buildscript `),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"val"),s(" booster_version "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token string-literal singleline"},[n("span",{class:"token string"},'"5.0.0"')]),s(`
        repositories `),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token function"},"google"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
            `),n("span",{class:"token function"},"mavenCentral"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        dependencies `),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token function"},"classpath"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string-literal singleline"},[n("span",{class:"token string"},'"com.didiglobal.booster:booster-gradle-plugin:'),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"$"),n("span",{class:"token expression"},"booster_version")]),n("span",{class:"token string"},'"')]),n("span",{class:"token punctuation"},")"),s(`
            `),n("span",{class:"token function"},"classpath"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string-literal singleline"},[n("span",{class:"token string"},'"com.didiglobal.booster:booster-transform-thread:'),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"$"),n("span",{class:"token expression"},"booster_version")]),n("span",{class:"token string"},'"')]),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    repositories `),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"google"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token function"},"mavenCentral"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    project`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"afterEvaluate"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("project"),n("span",{class:"token punctuation"},"."),s("extensions"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"getByName"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string-literal singleline"},[n("span",{class:"token string"},'"android"')]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
            project`),n("span",{class:"token punctuation"},"."),s("plugins"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"apply"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string-literal singleline"},[n("span",{class:"token string"},'"com.didiglobal.booster"')]),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers"},[n("span",{class:"line-number"},"1"),n("br"),n("span",{class:"line-number"},"2"),n("br"),n("span",{class:"line-number"},"3"),n("br"),n("span",{class:"line-number"},"4"),n("br"),n("span",{class:"line-number"},"5"),n("br"),n("span",{class:"line-number"},"6"),n("br"),n("span",{class:"line-number"},"7"),n("br"),n("span",{class:"line-number"},"8"),n("br"),n("span",{class:"line-number"},"9"),n("br"),n("span",{class:"line-number"},"10"),n("br"),n("span",{class:"line-number"},"11"),n("br"),n("span",{class:"line-number"},"12"),n("br"),n("span",{class:"line-number"},"13"),n("br"),n("span",{class:"line-number"},"14"),n("br"),n("span",{class:"line-number"},"15"),n("br"),n("span",{class:"line-number"},"16"),n("br"),n("span",{class:"line-number"},"17"),n("br"),n("span",{class:"line-number"},"18"),n("br"),n("span",{class:"line-number"},"19"),n("br"),n("span",{class:"line-number"},"20"),n("br"),n("span",{class:"line-number"},"21"),n("br"),n("span",{class:"line-number"},"22"),n("br")])],-1),w={href:"https://docs.gradle.org/current/userguide/init_scripts.html",target:"_blank",rel:"noopener noreferrer"},N=n("em",null,"Booster",-1),z=c(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>./gradlew <span class="token parameter variable">-I</span> init.gradle assembleDebug
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u5F53\u7136\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7 <em>Gradle</em> \u76EE\u5F55\u7684\u65B9\u5F0F\u6765\u63A5\u5165 <em>Booster</em>\u3002</p>`,2);function V($,H){const e=t("ExternalLinkIcon"),l=t("CodeGroupItem"),i=t("CodeGroup");return r(),p(u,null,[b,m,n("p",null,[s("\u901A\u8FC7 "),g,s(" \u63D0\u4F9B\u7684 "),n("a",_,[s("Initialization Scripts"),a(e)]),s("\uFF0C\u8FD9\u6837\u53EF\u4EE5\u5728\u4E0D\u4FEE\u6539\u5DE5\u7A0B\u7684\u4EE3\u7801\u7684\u60C5\u51B5\u4E0B\u96C6\u6210 "),h,s(" \u5B9E\u73B0\u5B8C\u5168\u65E0\u4FB5\u5165\u7684\u6027\u80FD\u4F18\u5316\uFF0C\u5C24\u5176\u662F\u5728 "),f,s(" \u73AF\u5883\u4E2D\u3002")]),n("p",null,[v,s(" \u652F\u6301\u4E24\u7C7B\u63A5\u5165 "),n("a",x,[s("Initialization Scripts"),a(e)]),s(" \u7684\u65B9\u5F0F\uFF1A")]),n("ol",null,[n("li",null,[s("\u547D\u4EE4\u884C\u53C2\u6570 "),n("ul",null,[n("li",null,[s("\u901A\u8FC7 "),y,s(" \u6216\u8005 "),I,s(" \u6307\u5B9A "),n("a",C,[s("Initialization Scripts"),a(e)]),s(" \u6587\u4EF6\uFF0C\u8FD9\u79CD\u65B9\u5F0F\u6BD4\u8F83\u7075\u6D3B\uFF0C\u800C\u4E14\u80FD\u63A7\u5236 "),n("a",E,[s("Initialization Scripts"),a(e)]),s(" \u7684\u5F71\u54CD\u8303\u56F4\u3002")])])]),j]),S,a(i,null,{default:o(()=>[a(l,{title:"Groovy",active:""},{default:o(()=>[G]),_:1}),a(l,{title:"Kotlin"},{default:o(()=>[B]),_:1})]),_:1}),n("p",null,[s("\u8FD9\u6837\uFF0C\u5C31\u53EF\u4EE5\u901A\u8FC7\u547D\u4EE4\u884C\u6307\u5B9A "),n("a",w,[s("Initialization Scripts"),a(e)]),s(" \u53C2\u6570\u7684\u65B9\u5F0F\u96C6\u6210 "),N,s(" \u4E86\uFF1A")]),z],64)}var O=k(d,[["render",V]]);export{O as default};