import{r as e,o,c as l,a as n,b as s,d as t,F as c,e as p}from"./app.9958f85a.js";import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";const i={},u=p('<h1 id="standalone-transformer" tabindex="-1"><a class="header-anchor" href="#standalone-transformer" aria-hidden="true">#</a> Standalone Transformer</h1><p>\u5728\u5E73\u5E38\u7684\u5F00\u53D1\u8FC7\u7A0B\u4E2D\uFF0C\u6211\u4EEC\u53EF\u80FD\u9700\u8981\u8131\u79BB <em>Gradle</em> \u73AF\u5883\uFF0C\u5BF9\u67D0\u4E9B\u4E2A <em>JAR</em>\u3001 <em>class</em> \u6587\u4EF6\u6216\u8005\u662F <em>Android Transform Pipeline</em> \u7684\u4EA7\u7269\u8FDB\u884C\u626B\u63CF\u6765\u5F97\u5230\u4E00\u4E9B\u7ED3\u679C\uFF0C\u9274\u4E8E\u6B64\uFF0C<em>Booster</em> \u63D0\u4F9B\u4E86\u4E00\u7CFB\u5217\u5B9E\u7528\u5DE5\u5177\u7C7B\u548C\u6269\u5C55\u65B9\u6CD5\uFF0C\u6765\u5E2E\u52A9\u5F00\u53D1\u8005\u63D0\u5347\u6548\u7387\uFF1A</p>',2),k={href:"https://github.com/didi/booster/tree/master/booster-transform-util",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/transform.kt",target:"_blank",rel:"noopener noreferrer"},b={href:"https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/TransformHelper.kt",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/didi/booster/tree/master/booster-transform-asm",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/didi/booster/blob/master/booster-transform-asm/src/main/kotlin/com/didiglobal/booster/transform/asm/AsmTransformer.kt",target:"_blank",rel:"noopener noreferrer"},g={href:"https://github.com/didi/booster/tree/master/booster-transform-javassist",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/didi/booster/blob/master/booster-transform-javassist/src/main/kotlin/com/didiglobal/booster/transform/javassist/JavassistTransformer.kt",target:"_blank",rel:"noopener noreferrer"},y=p(`<h2 id="runtime-instrumentation" tabindex="-1"><a class="header-anchor" href="#runtime-instrumentation" aria-hidden="true">#</a> Runtime Instrumentation</h2><p>\u4E00\u822C\u5728 <em>Java</em> \u73AF\u5883\u4E2D\uFF0C\u53EF\u80FD\u4F1A\u9700\u8981\u5728\u8FD0\u884C\u65F6\u4FEE\u6539\u67D0\u4E9B\u7279\u5B9A\u7684 <em>Class</em> \uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7 <code>Transformer</code> \u5F88\u5BB9\u6613\u7684\u5B9E\u73B0\u3002</p><h3 id="custom-classloader" tabindex="-1"><a class="header-anchor" href="#custom-classloader" aria-hidden="true">#</a> Custom ClassLoader</h3><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">class</span> TransformerClassLoader <span class="token operator">:</span> URLClassLoader <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">val</span> transformer<span class="token operator">:</span> Transformer

    <span class="token keyword">constructor</span><span class="token punctuation">(</span>
            delegate<span class="token operator">:</span> URLClassLoader<span class="token punctuation">,</span>
            factory<span class="token operator">:</span> <span class="token punctuation">(</span>ClassLoader<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Transformer
    <span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">super</span><span class="token punctuation">(</span>delegate<span class="token punctuation">.</span>urLs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>transformer <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">constructor</span><span class="token punctuation">(</span>
            delegate<span class="token operator">:</span> URLClassLoader<span class="token punctuation">,</span>
            factory<span class="token operator">:</span> <span class="token punctuation">(</span>ClassLoader<span class="token punctuation">,</span> Iterable<span class="token operator">&lt;</span>Transformer<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Transformer<span class="token punctuation">,</span>
            <span class="token keyword">vararg</span> transformer<span class="token operator">:</span> Transformer
    <span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">super</span><span class="token punctuation">(</span>delegate<span class="token punctuation">.</span>urLs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>transformer <span class="token operator">=</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> transformer<span class="token punctuation">.</span><span class="token function">asIterable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">val</span> classpath<span class="token operator">:</span> Collection<span class="token operator">&lt;</span>File<span class="token operator">&gt;</span> <span class="token keyword">by</span> lazy <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>urLs<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> <span class="token function">File</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span>path<span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">val</span> context<span class="token operator">:</span> TransformContext <span class="token keyword">by</span> lazy <span class="token punctuation">{</span>
        <span class="token keyword">object</span> <span class="token operator">:</span> <span class="token function">AbstractTransformContext</span><span class="token punctuation">(</span>javaClass<span class="token punctuation">.</span>name<span class="token punctuation">,</span> javaClass<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> classpath<span class="token punctuation">,</span> classpath<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">findClass</span><span class="token punctuation">(</span>name<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> Class<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> bytecode <span class="token operator">=</span> transformer<span class="token punctuation">.</span><span class="token function">run</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token function">onPreTransform</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>
                <span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">name<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token char">&#39;.&#39;</span><span class="token punctuation">,</span> <span class="token char">&#39;/&#39;</span><span class="token punctuation">)</span></span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.class&quot;</span></span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>InputStream<span class="token operator">::</span>readBytes<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span>
                    <span class="token function">transform</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> it<span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token operator">?:</span> <span class="token keyword">throw</span> <span class="token function">IOException</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Read class </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">name</span></span><span class="token string"> failed&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                <span class="token function">onPostTransform</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token function">defineClass</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> bytecode<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> bytecode<span class="token punctuation">.</span>size<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h3 id="using-asm" tabindex="-1"><a class="header-anchor" href="#using-asm" aria-hidden="true">#</a> Using ASM</h3><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">val</span> delegate <span class="token operator">=</span> Thread<span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>contextClassLoader <span class="token keyword">as</span> URLClassLoader
<span class="token keyword">val</span> tcl <span class="token operator">=</span> <span class="token function">TransformerClassLoader</span><span class="token punctuation">(</span>delegate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">AsmTransformer</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
Class<span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;io.johnsonlee.booster.SimpleClass&quot;</span></span><span class="token punctuation">,</span> tcl<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="using-javassist" tabindex="-1"><a class="header-anchor" href="#using-javassist" aria-hidden="true">#</a> Using Javassist</h3><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">val</span> delegate <span class="token operator">=</span> Thread<span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>contextClassLoader <span class="token keyword">as</span> URLClassLoader
<span class="token keyword">val</span> tcl <span class="token operator">=</span> <span class="token function">TransformerClassLoader</span><span class="token punctuation">(</span>delegate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">JavassistTransformer</span><span class="token punctuation">(</span>it<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
Class<span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;io.johnsonlee.booster.SimpleClass&quot;</span></span><span class="token punctuation">,</span> tcl<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="analysing-intermediate-artifacts" tabindex="-1"><a class="header-anchor" href="#analysing-intermediate-artifacts" aria-hidden="true">#</a> Analysing Intermediate Artifacts</h2>`,9),v={href:"https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/TransformHelper.kt",target:"_blank",rel:"noopener noreferrer"},_=n("em",null,"Android Transform Pipeline",-1),w=p(`<div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">val</span> variant <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;debug&quot;</span></span>
<span class="token keyword">val</span> input <span class="token operator">=</span> <span class="token function">File</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;build&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">file</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;intermediates&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;transforms&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;booster&quot;</span></span><span class="token punctuation">,</span> variant<span class="token punctuation">)</span>
<span class="token keyword">val</span> output <span class="token operator">=</span> <span class="token function">File</span><span class="token punctuation">(</span>System<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;java.io.tmpdir&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token function">TransformHelper</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span>output<span class="token punctuation">,</span> <span class="token function">AsmTransformer</span><span class="token punctuation">(</span><span class="token keyword">object</span> <span class="token operator">:</span> ClassTransformer <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">transform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">,</span> klass<span class="token operator">:</span> ClassNode<span class="token punctuation">)</span><span class="token operator">:</span> ClassNode <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span>klass<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
        <span class="token keyword">return</span> klass
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="analysing-jar-file" tabindex="-1"><a class="header-anchor" href="#analysing-jar-file" aria-hidden="true">#</a> Analysing JAR File</h2><p>\u901A\u8FC7\u4E0A\u9762\u63D0\u4F9B\u7684\u6269\u5C55\u65B9\u6CD5\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u626B\u63CF <em>JAR</em> \u6587\u4EF6\u4E2D\u7684 <em>class</em>\uFF1A</p><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token function">File</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;some.jar&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span><span class="token function">File</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;out&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> bytecode <span class="token operator">-&gt;</span>
    <span class="token keyword">val</span> klass <span class="token operator">=</span> bytecode<span class="token punctuation">.</span><span class="token function">asClassNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">println</span><span class="token punctuation">(</span>klass<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
    bytecode
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u6216\u8005</p><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token function">JarFile</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;some.jar&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span> <span class="token punctuation">{</span> jar <span class="token operator">-&gt;</span>
    jar<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> entry <span class="token operator">-&gt;</span>
        jar<span class="token punctuation">.</span><span class="token function">transform</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span> klass <span class="token operator">-&gt;</span>
            <span class="token function">println</span><span class="token punctuation">(</span>klass<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="analysing-class-file" tabindex="-1"><a class="header-anchor" href="#analysing-class-file" aria-hidden="true">#</a> Analysing Class File</h2><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">val</span> klass <span class="token operator">=</span> <span class="token function">File</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;Some.class&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asClassNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">println</span><span class="token punctuation">(</span>klass<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,8);function T(C,x){const a=e("ExternalLinkIcon");return o(),l(c,null,[u,n("ul",null,[n("li",null,[n("p",null,[n("a",k,[s("booster-transform-util"),t(a)])]),n("ul",null,[n("li",null,[n("a",m,[s("transform.kt"),t(a)])]),n("li",null,[n("a",b,[s("TransformHelper.kt"),t(a)])])])]),n("li",null,[n("p",null,[n("a",d,[s("booster-transform-asm"),t(a)])]),n("ul",null,[n("li",null,[n("a",f,[s("AsmTransformer"),t(a)])])])]),n("li",null,[n("p",null,[n("a",g,[s("booster-transform-javassist"),t(a)])]),n("ul",null,[n("li",null,[n("a",h,[s("JavassistTransformer"),t(a)])])])])]),y,n("p",null,[s("\u901A\u8FC7 "),n("a",v,[s("TransformHelper"),t(a)]),s("\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u5F88\u65B9\u4FBF\u5BF9 "),_,s(" \u7684\u4EA7\u7269\u8FDB\u884C\u626B\u63CF\uFF1A")]),w],64)}var j=r(i,[["render",T]]);export{j as default};
