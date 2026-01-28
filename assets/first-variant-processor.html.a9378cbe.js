import{e as s}from"./app.621f1d2a.js";import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";const p={};function t(e,n){return n[0]||(n[0]=s(`<h1 id="frist-variantprocessor" tabindex="-1"><a class="header-anchor" href="#frist-variantprocessor" aria-hidden="true">#</a> Frist VariantProcessor</h1><h2 id="introducing-booster" tabindex="-1"><a class="header-anchor" href="#introducing-booster" aria-hidden="true">#</a> Introducing Booster</h2><p>After preparing the project, add the <em>Booster</em> dependency in the <em>build.gradle</em> file of the <em>Java Library</em> project or the <em>buildSrc</em> directory of the <em>Android</em> project:</p><div class="language-groovy ext-groovy line-numbers-mode"><pre class="language-groovy"><code>buildscript <span class="token punctuation">{</span>
    ext <span class="token punctuation">{</span>
        agp_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;3.5.0&quot;</span></span>
        kotlin_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;1.5.31&quot;</span></span>
        booster_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">&quot;4.16.3&quot;</span></span>
    <span class="token punctuation">}</span>
    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    dependencies <span class="token punctuation">{</span>
        classpath <span class="token interpolation-string"><span class="token string">&quot;org.jetbrains.kotlin:kotlin-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">&quot;</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;kotlin&#39;</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">&#39;kotlin-kapt&#39;</span>

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

sourceSets <span class="token punctuation">{</span>
    main <span class="token punctuation">{</span>
        java <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        kotlin <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token string">&#39;src/main/kotlin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;src/main/java&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    test <span class="token punctuation">{</span>
        java <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
        kotlin <span class="token punctuation">{</span>
            srcDirs <span class="token operator">+=</span> <span class="token punctuation">[</span><span class="token string">&#39;src/main/kotlin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;src/main/java&#39;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

compileKotlin <span class="token punctuation">{</span>
    kotlinOptions<span class="token punctuation">.</span>jvmTarget <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_8
<span class="token punctuation">}</span>

compileTestKotlin <span class="token punctuation">{</span>
    kotlinOptions<span class="token punctuation">.</span>jvmTarget <span class="token operator">=</span> JavaVersion<span class="token punctuation">.</span>VERSION_1_8
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    api <span class="token function">gradleApi</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">/* \u{1F447}\u{1F447}\u{1F447}\u{1F447} Reference these three modules \u{1F447}\u{1F447}\u{1F447}\u{1F447} */</span>
    kapt <span class="token interpolation-string"><span class="token string">&quot;com.google.auto.service:auto-service:1.0&quot;</span></span>
    api <span class="token string">&#39;com.android.tools.build:gradle:$agp_version&#39;</span>
    api <span class="token interpolation-string"><span class="token string">&quot;com.didiglobal.booster:booster-api:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">booster_version</span></span><span class="token string">&quot;</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div><h2 id="custom-variantprocessor" tabindex="-1"><a class="header-anchor" href="#custom-variantprocessor" aria-hidden="true">#</a> Custom VariantProcessor</h2><div class="language-kotlin ext-kt line-numbers-mode"><pre class="language-kotlin"><code><span class="token keyword">package</span> io<span class="token punctuation">.</span>johnsonlee<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>demo

<span class="token keyword">import</span> com<span class="token punctuation">.</span>android<span class="token punctuation">.</span>build<span class="token punctuation">.</span>gradle<span class="token punctuation">.</span>api<span class="token punctuation">.</span>BaseVariant
<span class="token keyword">import</span> com<span class="token punctuation">.</span>didiglobal<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>gradle<span class="token punctuation">.</span>project
<span class="token keyword">import</span> com<span class="token punctuation">.</span>didiglobal<span class="token punctuation">.</span>booster<span class="token punctuation">.</span>task<span class="token punctuation">.</span>spi<span class="token punctuation">.</span>VariantProcessor
<span class="token keyword">import</span> com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>auto<span class="token punctuation">.</span>service<span class="token punctuation">.</span>AutoService

<span class="token annotation builtin">@AutoService</span><span class="token punctuation">(</span>VariantProcessor<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> <span class="token function">SimpleVariantProcessor</span><span class="token punctuation">(</span><span class="token keyword">val</span> project<span class="token operator">:</span> Project<span class="token punctuation">)</span> <span class="token operator">:</span> VariantProcessor <span class="token punctuation">{</span>

    <span class="token keyword">init</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">project<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">process</span><span class="token punctuation">(</span>variant<span class="token operator">:</span> BaseVariant<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">variant<span class="token punctuation">.</span>project<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token expression">variant<span class="token punctuation">.</span>name</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>The <code>Project</code> parameter in the <code>VariantProcessor</code> constructor is optional.</p></div><h2 id="verifying-firstvariantprocessor" tabindex="-1"><a class="header-anchor" href="#verifying-firstvariantprocessor" aria-hidden="true">#</a> Verifying FirstVariantProcessor</h2><p>In the <em>Android</em> project, execute the <em>assemble</em> task:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ ./gradlew assembleDebug
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Observe the console standard output to see if it contains content like:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>app: debug
app: release
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,12))}var i=a(p,[["render",t]]);export{i as default};
