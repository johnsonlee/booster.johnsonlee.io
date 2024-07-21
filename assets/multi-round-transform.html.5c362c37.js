import{r as t,o as p,c as r,a as n,b as s,d as o,F as l,e}from"./app.9958f85a.js";import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";const i={},u=n("h1",{id:"multi-round-transform",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#multi-round-transform","aria-hidden":"true"},"#"),s(" Multi-Round Transform")],-1),k=n("em",null,"Booster",-1),b=n("code",null,"Transformer",-1),d=n("em",null,"transform",-1),m=n("em",null,"pipeline",-1),f=n("em",null,"transform",-1),h=n("code",null,"Transformer",-1),g=n("em",null,"transform",-1),v=n("em",null,"Booster",-1),_={href:"https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Collector.kt#L7",target:"_blank",rel:"noopener noreferrer"},C={href:"https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Collector.kt#L23",target:"_blank",rel:"noopener noreferrer"},y=e('<h2 id="\u4EC0\u4E48\u662F-collector" tabindex="-1"><a class="header-anchor" href="#\u4EC0\u4E48\u662F-collector" aria-hidden="true">#</a> \u4EC0\u4E48\u662F <code>Collector</code>\uFF1F</h2><p><code>Collector</code> \u662F\u5728\u529F\u80FD\u4E0A\u5BF9 <code>Transformer</code> \u5355\u5411\u7BA1\u9053\u7684\u8865\u5145\uFF0C\u7528\u4E8E\u4ECE transform pipeline \u4E2D\u6536\u96C6\u4FE1\u606F\uFF0C\u540C\u65F6\u4E5F\u51B3\u5B9A\u7740 pipeline \u7684\u8F93\u5165\u662F\u5426\u9700\u8981\u66F4\u65B0\u3002</p><h2 id="\u4EC0\u4E48\u662F-supervisor" tabindex="-1"><a class="header-anchor" href="#\u4EC0\u4E48\u662F-supervisor" aria-hidden="true">#</a> \u4EC0\u4E48\u662F <code>Supervisor</code>\uFF1F</h2><p><code>Supervisor</code> \u662F\u4E00\u79CD\u7279\u6B8A\u7684 <code>Collector</code>\uFF0C\u5B83\u53EA\u662F\u89C2\u5BDF transform pipeline \uFF0C\u5E76\u6536\u96C6\u4FE1\u606F\uFF0C\u4F46\u4E0D\u4F1A\u5F71\u54CD pipeline \u8F93\u5165\u7684\u66F4\u65B0\u3002</p><h2 id="booster-\u63D0\u4F9B\u7684-collector" tabindex="-1"><a class="header-anchor" href="#booster-\u63D0\u4F9B\u7684-collector" aria-hidden="true">#</a> Booster \u63D0\u4F9B\u7684 <code>Collector</code></h2>',5),S={href:"https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collectors.kt#L25",target:"_blank",rel:"noopener noreferrer"},x={href:"https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collector.kt#L26",target:"_blank",rel:"noopener noreferrer"},w={href:"https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collectors.kt#L53",target:"_blank",rel:"noopener noreferrer"},T={href:"https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collectors.kt#L65",target:"_blank",rel:"noopener noreferrer"},L=n("h2",{id:"booster-\u63D0\u4F9B\u7684-supervisor",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#booster-\u63D0\u4F9B\u7684-supervisor","aria-hidden":"true"},"#"),s(" Booster \u63D0\u4F9B\u7684 "),n("code",null,"Supervisor")],-1),N={href:"https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Supervisors.kt#L19",target:"_blank",rel:"noopener noreferrer"},O={href:"https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Supervisors.kt#L37",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Supervisors.kt#L55",target:"_blank",rel:"noopener noreferrer"},P=e(`<h2 id="\u4F7F\u7528-servicesupervisor-\u6536\u96C6-spi-\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-servicesupervisor-\u6536\u96C6-spi-\u670D\u52A1" aria-hidden="true">#</a> \u4F7F\u7528 ServiceSupervisor \u6536\u96C6 SPI \u670D\u52A1</h2><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token annotation builtin">@AutoService</span><span class="token punctuation">(</span>ClassTransformer<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> MyTransformer <span class="token operator">:</span> ClassTransformer <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">val</span> services<span class="token operator">:</span> MutableList<span class="token operator">&lt;</span>Pair<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> Collection<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span><span class="token operator">&gt;</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onPreTransform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context<span class="token punctuation">.</span><span class="token function">registerCollector</span><span class="token punctuation">(</span><span class="token function">ServiceSupervisor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            services <span class="token operator">+=</span> it
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">transform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">,</span> klass<span class="token operator">:</span> ClassNode<span class="token punctuation">)</span> <span class="token operator">=</span> klass<span class="token punctuation">.</span><span class="token function">apply</span> <span class="token punctuation">{</span>
        services<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span>api<span class="token punctuation">,</span> implementation<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>
            <span class="token comment">// TODO ...</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="\u4F7F\u7528-namecollector-\u5F3A\u5236\u66F4\u65B0-pipeline" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-namecollector-\u5F3A\u5236\u66F4\u65B0-pipeline" aria-hidden="true">#</a> \u4F7F\u7528 NameCollector \u5F3A\u5236\u66F4\u65B0 pipeline</h2><p>\u4E0B\u9762\u7684\u4F8B\u5B50\u4E2D\uFF0C\u901A\u8FC7 <code>NameCollector</code> \u6765\u8868\u793A\u8981\u5173\u6CE8 transform pipeline \u4E2D\u5305\u542B\u6709 <code>io/johnsonlee/framework/ServiceRegistry.class</code> \u7684\u8F93\u5165\uFF0C\u5982\u679C\u5339\u914D\u5230\u5BF9\u5E94\u7684\u8F93\u5165\uFF0C\u5C31\u4F1A\u5728\u6BCF\u6B21 transform \u7684\u65F6\u5019\u66F4\u884C\u5F3A\u5236\u66F4\u65B0\uFF0C\u65E0\u8BBA\u662F\u5426\u662F\u589E\u91CF\u6784\u5EFA\uFF0C\u4EE3\u7801\u5982\u4E0B\u6240\u793A\uFF1A</p><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token annotation builtin">@AutoService</span><span class="token punctuation">(</span>ClassTransformer<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> ServiceRegistryTransformer <span class="token operator">:</span> ClassTransformer <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">val</span> services<span class="token operator">:</span> MutableList<span class="token operator">&lt;</span>Pair<span class="token operator">&lt;</span>String<span class="token punctuation">,</span> Collection<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span><span class="token operator">&gt;</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token function">mutableListOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onPreTransform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        context<span class="token punctuation">.</span><span class="token function">registerCollector</span><span class="token punctuation">(</span><span class="token function">ServiceSupervisor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            services <span class="token operator">+=</span> it
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        context<span class="token punctuation">.</span><span class="token function">registerCollector</span><span class="token punctuation">(</span><span class="token function">NameCollector</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;io/johnsonlee/framework/ServiceRegistry.class&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">transform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">,</span> klass<span class="token operator">:</span> ClassNode<span class="token punctuation">)</span> <span class="token operator">=</span> klass<span class="token punctuation">.</span><span class="token function">apply</span> <span class="token punctuation">{</span>
        <span class="token keyword">when</span> <span class="token punctuation">(</span>klass<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token string-literal singleline"><span class="token string">&quot;io/johnsonlee/framework/ServiceRegistry&quot;</span></span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                <span class="token comment">// TODO generate service registry</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="\u81EA\u5B9A\u4E49-collector-supervisor" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49-collector-supervisor" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49 Collector/Supervisor</h2>`,6),R={href:"https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Collector.kt#L7",target:"_blank",rel:"noopener noreferrer"},M=e(`<div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">class</span> MyCollector <span class="token operator">:</span> Collector<span class="token operator">&lt;</span>String<span class="token operator">&gt;</span> <span class="token punctuation">{</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">accept</span><span class="token punctuation">(</span>name<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token operator">=</span> <span class="token boolean">true</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">collect</span><span class="token punctuation">(</span>name<span class="token operator">:</span> String<span class="token punctuation">,</span> <span class="token keyword">data</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> ByteArray<span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
        <span class="token keyword">val</span> klass <span class="token operator">=</span> <span class="token keyword">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">asClassNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// TODO</span>
        <span class="token keyword">return</span> <span class="token operator">..</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u7136\u540E\uFF0C\u5728 <code>onPreTransform</code> \u65B9\u6CD5\u4E2D\u8FDB\u884C\u6CE8\u518C\uFF1A</p><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onPreTransform</span><span class="token punctuation">(</span>context<span class="token operator">:</span> TransformContext<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    context<span class="token punctuation">.</span><span class="token function">registerCollector</span><span class="token punctuation">(</span><span class="token function">MyCollector</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment">// TODO ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,3);function A(D,I){const a=t("ExternalLinkIcon");return p(),r(l,null,[u,n("p",null,[s("\u5728 "),k,s(" \u4E2D\uFF0C"),b,s(" \u662F\u57FA\u4E8E\u5355\u8F6E "),d,s(" \u7684 "),m,s(" \u800C\u8BBE\u8BA1\u7684\uFF0C\u4F46\u6709\u4E00\u4E9B\u7279\u6B8A\u60C5\u51B5\u4E0B\uFF0C\u9700\u8981\u5148\u4ECE\u5B57\u8282\u7801\u4E2D\u6536\u96C6\u5230\u5B8C\u6574\u7684\u4FE1\u606F\u540E\uFF0C\u624D\u80FD\u8FDB\u884C "),f,s("\uFF0C\u800C\u8FD9\u6837\u7684\u9700\u6C42\u901A\u8FC7 "),h,s(" \u662F\u4E0D\u592A\u5BB9\u6613\u5B9E\u73B0\u7684\uFF0C\u4E3A\u4E86\u652F\u6301\u5728 "),g,s(" \u4E4B\u524D\u6536\u96C6\u66F4\u591A\u7684\u4FE1\u606F\uFF0C"),v,s(" \u63D0\u4F9B\u4E86 "),n("a",_,[s("Collector API"),o(a)]),s(" \u548C "),n("a",C,[s("Supervisor API"),o(a)]),s("\uFF0C\u8BA9\u5F00\u53D1\u8005\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u5B9E\u73B0\u8BE5\u9700\u6C42\u3002")]),y,n("ul",null,[n("li",null,[n("a",S,[s("Collectors.ClassNameCollector"),o(a)])]),n("li",null,[n("a",x,[s("Collectors.ServiceCollector"),o(a)])]),n("li",null,[n("a",w,[s("NameCollector"),o(a)])]),n("li",null,[n("a",T,[s("RegexCollector"),o(a)])])]),L,n("ul",null,[n("li",null,[n("a",N,[s("ClassDescriptorSupervisor"),o(a)])]),n("li",null,[n("a",O,[s("ClassNameSupervisor"),o(a)])]),n("li",null,[n("a",B,[s("ServiceSupervisor"),o(a)])])]),P,n("p",null,[s("\u5F00\u53D1\u8005\u53EA\u6839\u636E\u81EA\u5DF1\u7684\u9700\u8981\u5B9E\u73B0 "),n("a",R,[s("Collector"),o(a)]),s(" \u63A5\u53E3\uFF1A")]),M],64)}var V=c(i,[["render",A]]);export{V as default};