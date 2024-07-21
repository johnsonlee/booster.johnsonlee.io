import{r as p,o as e,c as o,a as n,b as s,d as t,F as c,e as r}from"./app.9958f85a.js";import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";const i={},u=n("h1",{id:"using-classtransformer-with-task",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#using-classtransformer-with-task","aria-hidden":"true"},"#"),s(" Using ClassTransformer with Task")],-1),k=n("em",null,"Task",-1),b=n("em",null,"Android Transform Pipeline",-1),m={href:"https://github.com/didi/booster/blob/master/booster-task-analyser",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/didi/booster/blob/master/booster-task-analyser/src/main/kotlin/com/didiglobal/booster/task/analyser/AnalyserTask.kt",target:"_blank",rel:"noopener noreferrer"},f=n("em",null,"Android Transform Pipeline",-1),h=n("em",null,"Booster",-1),v={href:"https://github.com/didi/booster/blob/master/booster-api",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/didi/booster/blob/master/booster-api/src/main/kotlin/com/didiglobal/booster/transform/VariantTransformHelper.kt",target:"_blank",rel:"noopener noreferrer"},_=r(`<h2 id="\u901A\u8FC7-variantprocessor-\u521B\u5EFA-task" tabindex="-1"><a class="header-anchor" href="#\u901A\u8FC7-variantprocessor-\u521B\u5EFA-task" aria-hidden="true">#</a> \u901A\u8FC7 <em>VariantProcessor</em> \u521B\u5EFA <em>Task</em></h2><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token annotation builtin">@AutoService</span><span class="token punctuation">(</span>VariantProcessor<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> ScannerVariantProcessor <span class="token operator">:</span> VariantProcessor <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">process</span><span class="token punctuation">(</span>variant<span class="token operator">:</span> BaseVariant<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> project <span class="token operator">=</span> variant<span class="token punctuation">.</span>project
        <span class="token keyword">val</span> variantName <span class="token operator">=</span> variant<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">capitalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> transform <span class="token operator">=</span> variant<span class="token punctuation">.</span>extension<span class="token punctuation">.</span>transforms<span class="token punctuation">.</span><span class="token function">reversed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">first</span> <span class="token punctuation">{</span>
            it<span class="token punctuation">.</span>scopes<span class="token punctuation">.</span><span class="token function">containsAll</span><span class="token punctuation">(</span>TransformManager<span class="token punctuation">.</span>SCOPE_FULL_PROJECT<span class="token punctuation">)</span>
                    <span class="token operator">&amp;&amp;</span> it<span class="token punctuation">.</span>inputTypes<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>QualifiedContent<span class="token punctuation">.</span>DefaultContentType<span class="token punctuation">.</span>CLASSES<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token operator">?:</span> <span class="token keyword">throw</span> <span class="token function">GradleException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;No available transform&quot;</span></span><span class="token punctuation">)</span>

        project<span class="token punctuation">.</span>tasks<span class="token punctuation">.</span><span class="token function">withType</span><span class="token punctuation">(</span>TransformTask<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span> <span class="token punctuation">{</span>
            it<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">endsWith</span><span class="token punctuation">(</span>variantName<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> it<span class="token punctuation">.</span>transform <span class="token operator">==</span> transform
        <span class="token punctuation">}</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span> transformTask <span class="token operator">-&gt;</span>
            project<span class="token punctuation">.</span>tasks<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;scan</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">variantName</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> ScannerTask<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                it<span class="token punctuation">.</span>variant <span class="token operator">=</span> variant
                it<span class="token punctuation">.</span>supplier <span class="token operator">=</span> <span class="token punctuation">{</span>
                    transformTask<span class="token punctuation">.</span>outputs<span class="token punctuation">.</span>files<span class="token punctuation">.</span><span class="token function">single</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">dependsOn</span><span class="token punctuation">(</span>transformTask<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="\u901A\u8FC7-varianttransformhelper-\u590D\u7528-transformer" tabindex="-1"><a class="header-anchor" href="#\u901A\u8FC7-varianttransformhelper-\u590D\u7528-transformer" aria-hidden="true">#</a> \u901A\u8FC7 <em>VariantTransformHelper</em> \u590D\u7528 <em>Transformer</em></h2><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">open</span> <span class="token keyword">class</span> ScannerTask <span class="token operator">:</span> <span class="token function">AbstractTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">lateinit</span> <span class="token keyword">var</span> variant<span class="token operator">:</span> BaseVariant

    <span class="token keyword">lateinit</span> <span class="token keyword">var</span> supplier<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> File

    <span class="token annotation builtin">@get:Input</span>
    <span class="token keyword">val</span> variantName<span class="token operator">:</span> String
        <span class="token keyword">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> variant<span class="token punctuation">.</span>name

    <span class="token annotation builtin">@TaskAction</span>
    <span class="token keyword">fun</span> <span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">VariantTransformHelper</span><span class="token punctuation">(</span>variant<span class="token punctuation">,</span> <span class="token function">supplier</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span>project<span class="token punctuation">.</span>projectDir<span class="token punctuation">,</span> <span class="token function">AsmTransformer</span><span class="token punctuation">(</span><span class="token function">ScannerTransformer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="\u81EA\u5B9A\u4E49-classtransformer" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49-classtransformer" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49 <em>ClassTransformer</em></h2><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token annotation builtin">@AutoService</span><span class="token punctuation">(</span>ClassTransformer<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> ScannerTransformer <span class="token operator">:</span> ClassTransformer <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">transform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">,</span> klass<span class="token operator">:</span> ClassNode<span class="token punctuation">)</span><span class="token operator">:</span> ClassNode <span class="token punctuation">{</span>
        <span class="token comment">// scanning klass</span>
        klass
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,6);function T(y,w){const a=p("ExternalLinkIcon");return e(),o(c,null,[u,n("p",null,[s("\u5728\u5E73\u5E38\u7684\u5F00\u53D1\u8FC7\u7A0B\u4E2D\uFF0C\u6211\u4EEC\u53EF\u80FD\u9700\u8981\u5728 "),k,s(" \u4E2D\u4F9D\u8D56 "),b,s(" \u7684\u4EA7\u51FA\u7269\uFF0C\u4F8B\u5982\uFF1A"),n("a",m,[s("booster-task-analyser"),t(a)]),s(" \u5C31\u662F\u5728 "),n("a",d,[s("AnalyserTask"),t(a)]),s(" \u4E2D\u5BF9 "),f,s(" \u7684\u4EA7\u51FA\u7269\u8FDB\u884C\u9759\u6001\u5206\u6790\uFF0C\u9488\u5BF9\u8FD9\u79CD\u5E94\u7528\u573A\u666F\uFF0C"),h,s(" \u63D0\u4F9B\u4E86\u4E00\u7CFB\u5217\u5B9E\u7528\u7C7B\u548C\u6269\u5C55\u65B9\u6CD5\uFF1A")]),n("ul",null,[n("li",null,[n("p",null,[n("a",v,[s("booster-api"),t(a)])])]),n("li",null,[n("p",null,[n("a",g,[s("VariantTransformHelper.kt"),t(a)])])])]),_],64)}var V=l(i,[["render",T]]);export{V as default};