// pages.js — All static page content
// Each function returns an HTML string rendered into #pageContent
// NOTE: use straight quotes only and avoid backticks inside the HTML.

window.PAGES = {

  about: () => `
    <div class="profile-block">
      <div class="profile-avatar-placeholder">&#x1F469;&#x200D;&#x1F4BB;</div>
      <div class="profile-info">
        <div class="profile-name">Smruthi Balaji</div>
        <div class="profile-title">// Software Engineer, Azure Compute @ Microsoft</div>
      </div>
    </div>

    <h1 class="md-h1">About Me</h1>
    <p class="md-p">
      Hi, I'm <strong>Smruthi</strong>, a software engineer at Microsoft in Bengaluru.
      I graduated in 2025 with a BTech in Artificial Intelligence and Data Science
      from Shiv Nadar University Chennai (CGPA 9.3).
    </p>
    <p class="md-p">
      At Azure Compute I contribute to the systems that orchestrate test execution and quality
      validation for Azure Host, SoC and hardware releases. My work spans large-scale Spark data
      pipelines, A/B experimentation, test coverage, incident response and AI agents that automate
      coverage analysis. My background is in machine learning, with experience in model
      calibration for Bing Ads and multimodal speech and text modelling.
    </p>

    <h2 class="md-h2">Interests</h2>
    <div class="interests">
      <span class="interest-chip">&#x1F916; Machine Learning</span>
      <span class="interest-chip">&#x1F399; Speech &amp; Emotion Recognition</span>
      <span class="interest-chip">&#x1F4AC; NLP</span>
      <span class="interest-chip">&#x1F4CA; Data Pipelines</span>
      <span class="interest-chip">&#x1F9EA; Experimentation</span>
      <span class="interest-chip">&#x2601; Cloud Infrastructure</span>
      <span class="interest-chip">&#x1F9BE; AI Agents</span>
    </div>

    <h2 class="md-h2">Currently</h2>
    <p class="md-p">
      &#x1F4CD; Based in <span class="md-code">Bengaluru, India</span><br/>
      &#x1F4BC; Software Engineer, Azure Compute at <span class="md-code">Microsoft</span><br/>
      &#x1F52D; Working on <span class="md-code">pre-production validation &amp; AI agents</span>
    </p>
  `,

  education: () => `
    <h1 class="md-h1">Education</h1>

    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-role">BTech &mdash; Artificial Intelligence and Data Science</div>
          <div class="timeline-org">Shiv Nadar University Chennai</div>
          <div class="timeline-period">2021 &ndash; 2025 &middot; Chennai, India &middot; CGPA: 9.3</div>
          <div class="timeline-desc">
            Relevant coursework: Data Structures and Algorithms, Database Management System,
            Computer Networks, Data Science, Machine Learning, Natural Language Processing.
          </div>
          <div class="tag-list">
            <span class="tag">Data Structures &amp; Algorithms</span>
            <span class="tag">DBMS</span>
            <span class="tag">Computer Networks</span>
            <span class="tag">Data Science</span>
            <span class="tag">Machine Learning</span>
            <span class="tag">NLP</span>
          </div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-role">Kendriya Vidyalaya</div>
          <div class="timeline-period">Apr 2009 &ndash; Jan 2021</div>
          <div class="grade-list">
            <div class="grade-row">
              <span class="grade-class">Class 12</span>
              <span class="grade-score">94.4%</span>
              <div class="tag-list">
                <span class="tag">Physics</span>
                <span class="tag">Chemistry</span>
                <span class="tag">Maths</span>
                <span class="tag">Computer Science</span>
              </div>
            </div>
            <div class="grade-row">
              <span class="grade-class">Class 10</span>
              <span class="grade-score">95.4%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  experience: () => `
    <h1 class="md-h1">Experience</h1>

    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-role">Software Engineer, Azure Compute</div>
          <div class="timeline-org">Microsoft</div>
          <div class="timeline-period">July 2025 &ndash; Present &middot; Bengaluru, India</div>
          <ul class="timeline-list">
            <li>Contributing to Azure pre-production validation systems that orchestrate test execution
            and quality validation for Azure Host, SoC and hardware releases.</li>
            <li>Built Spark data pipelines using Azure Synapse and ADLS for large-scale data processing.</li>
            <li>Designed and developed an ADLS-backed historical-control framework for A/B experimentation,
            detecting <strong>12 additional production regressions</strong> (<strong>19%</strong> of true
            positives) from July to September 2026.</li>
            <li>Expanded qualification coverage for newer Azure hardware generations, increasing reliable
            test coverage from <strong>47%</strong> to <strong>97%</strong>.</li>
            <li>Contributed to production reliability and incident response, driving RCA and resolution
            of production regressions and pipeline failures.</li>
            <li>Developed and customized AI agents to automate coverage analysis, reporting and gap investigation.</li>
          </ul>
          <div class="tag-list">
            <span class="tag">Azure</span>
            <span class="tag">Spark</span>
            <span class="tag">Azure Synapse</span>
            <span class="tag">ADLS</span>
            <span class="tag">Kusto / KQL</span>
            <span class="tag">A/B Experimentation</span>
            <span class="tag">AI Agents</span>
          </div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-role">Research Intern, LEAP Lab</div>
          <div class="timeline-org">Indian Institute of Science</div>
          <div class="timeline-period">Jan 2025 &ndash; June 2025 &middot; Bengaluru, India</div>
          <ul class="timeline-list">
            <li>Secured <strong>4th place out of 160 teams</strong> in the Interspeech Emotion Recognition
            Challenge by experimenting with loss functions and data augmentation.</li>
            <li>Developed a Multimodal Mixture of Experts (MoE) model to fuse text and audio, achieving
            <strong>70.9</strong> on IEMOCAP and <strong>69.5</strong> on MELD without relying on speaker information.</li>
            <li>Conducted comparative experiments between proposed and baseline models to evaluate
            multimodal fusion strategies.</li>
          </ul>
          <div class="tag-list">
            <span class="tag">PyTorch</span>
            <span class="tag">HuggingFace</span>
            <span class="tag">Mixture of Experts</span>
            <span class="tag">Multimodal Learning</span>
            <span class="tag">Speech Emotion Recognition</span>
          </div>
        </div>
      </div>

      <div class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-role">Software Engineer Intern, Bing Ads</div>
          <div class="timeline-org">Microsoft</div>
          <div class="timeline-period">May 2024 &ndash; July 2024 &middot; Bengaluru, India</div>
          <ul class="timeline-list">
            <li>Evaluated query-ad pair relevance models for Bing Ads, with a focus on model calibration.</li>
            <li>Designed experiments to analyze the impact of training data sources, calibration algorithms
            and hyper-parameters on model performance.</li>
            <li>Improved the defect metric delta from <strong>10%</strong> to <strong>2%</strong> through
            calibration improvements.</li>
          </ul>
          <div class="tag-list">
            <span class="tag">Model Calibration</span>
            <span class="tag">Relevance Models</span>
            <span class="tag">Experiment Design</span>
          </div>
        </div>
      </div>
    </div>
  `,

  skills: () => `
    <h1 class="md-h1">Skills</h1>

    <div class="skill-groups">
      <div>
        <div class="skill-group-label">Languages</div>
        <div class="tag-list">
          <span class="tag">Python</span>
          <span class="tag">C</span>
          <span class="tag">SQL</span>
          <span class="tag">KQL</span>
          <span class="tag">HTML</span>
        </div>
      </div>
      <div>
        <div class="skill-group-label">AI Frameworks</div>
        <div class="tag-list">
          <span class="tag">PyTorch</span>
          <span class="tag">HuggingFace</span>
        </div>
      </div>
      <div>
        <div class="skill-group-label">Technologies</div>
        <div class="tag-list">
          <span class="tag">Linux</span>
          <span class="tag">Windows</span>
          <span class="tag">NumPy</span>
          <span class="tag">Pandas</span>
        </div>
      </div>
      <div>
        <div class="skill-group-label">Tools &amp; Platforms</div>
        <div class="tag-list">
          <span class="tag">Git</span>
          <span class="tag">GitHub</span>
          <span class="tag">VS Code</span>
          <span class="tag">Tableau</span>
          <span class="tag">Microsoft Azure</span>
          <span class="tag">Azure Synapse Analytics</span>
          <span class="tag">Azure Data Explorer (Kusto)</span>
        </div>
      </div>
    </div>
  `,

  projects: () => `
    <h1 class="md-h1">Projects</h1>
    <p class="md-p">Things I've built. More to come.</p>

    <div class="card-grid">
      <div class="card">
        <div class="card-title">Smart Invest</div>
        <div class="card-meta">Python &middot; Neural Networks &middot; Jupyter Notebook</div>
        <div class="card-desc">
          Accounts for stock policy changes using an ensemble of LSTM and Linear Regression models.
          Predicts ROI for the next 90 days across five sectors, giving insights on investment
          opportunities and optimal stock selling timings.
        </div>
        <div class="tag-list">
          <span class="tag">Python</span>
          <span class="tag">LSTM</span>
          <span class="tag">Linear Regression</span>
          <span class="tag">Neural Networks</span>
        </div>
        <a href="https://github.com/smruthi49" target="_blank" class="card-link">&#x2197; GitHub</a>
      </div>
    </div>
  `,

  research: () => `
    <h1 class="md-h1">Research</h1>
    <p class="md-p">
      Papers and academic work from my time at the LEAP Lab, Indian Institute of Science.
    </p>

    <h2 class="md-h2">Publications</h2>
    <div class="research-list">

      <div class="research-card">
        <div class="research-header">
          <span class="research-venue">INTERSPEECH 2025</span>
          <span class="research-status published">Published</span>
        </div>
        <div class="research-title">ABHINAYA &ndash; A System for Speech Emotion Recognition In Naturalistic Conditions Challenge</div>
        <div class="research-authors">
          Soumya Dutta, <strong>Smruthi Balaji</strong>, Varada R, Viveka Salinamakki, Sriram Ganapathy
        </div>
        <div class="research-abstract">
          Our system for the Interspeech Speech Emotion Recognition in Naturalistic Conditions
          Challenge, which placed 4th out of 160 teams. We explored different loss functions and
          data augmentation for recognising emotion from natural speech.
        </div>
        <div class="tag-list">
          <span class="tag">Speech Emotion Recognition</span>
          <span class="tag">Multimodal Learning</span>
        </div>
        <div class="research-links">
          <a href="https://arxiv.org/abs/2505.18217" target="_blank" class="research-link">&#x2197; arXiv</a>
        </div>
      </div>

      <div class="research-card">
        <div class="research-header">
          <span class="research-venue">Computer Speech &amp; Language 2026</span>
          <span class="research-status published">Published</span>
        </div>
        <div class="research-title">A Mixture-of-Experts model for multimodal emotion recognition in conversations</div>
        <div class="research-authors">
          Soumya Dutta, <strong>Smruthi Balaji</strong>, Sriram Ganapathy
        </div>
        <div class="research-abstract">
          MiSTER-E, a Mixture of Experts model that recognises emotions in conversations using both
          speech and text. It combines a speech expert, a text expert and a cross-modal expert, and
          reaches 70.9% on IEMOCAP and 69.5% on MELD (weighted F1) without using speaker information.
        </div>
        <div class="tag-list">
          <span class="tag">Emotion Recognition</span>
          <span class="tag">Mixture of Experts</span>
          <span class="tag">Multimodal Fusion</span>
        </div>
        <div class="research-links">
          <a href="https://www.sciencedirect.com/science/article/abs/pii/S0885230826000288" target="_blank" class="research-link">&#x2197; ScienceDirect</a>
        </div>
      </div>

    </div>
  `,

  misc: () => `
    <h1 class="md-h1">Miscellaneous</h1>
    <p class="md-p">
      Things that don't fit neatly anywhere else.
    </p>

    <h2 class="md-h2">Outside of Work</h2>
    <p class="md-p">
      I have a knack for creativity, and I love making things with my hands.
    </p>
    <div class="card-grid">
      <div class="card">
        <div class="card-title">&#x1F3A8; Art &amp; Craft</div>
        <div class="card-desc">I like to paint and make little art and craft pieces.</div>
      </div>
      <div class="card">
        <div class="card-title">&#x1F3B6; Singing &amp; Dancing</div>
        <div class="card-desc">I enjoy singing and dancing whenever I get the chance.</div>
      </div>
      <div class="card">
        <div class="card-title">&#x1F4DA; Reading</div>
        <div class="card-desc">
          I'm not much of a reader, but I'm trying. Currently reading <em>Almond</em> by Won-pyung Sohn.
        </div>
      </div>
      <div class="card">
        <div class="card-title">&#x1F4FA; Sitcoms</div>
        <div class="card-desc">I love watching sitcoms.</div>
      </div>
    </div>

  `,

  community: () => `
    <h1 class="md-h1">Community</h1>
    <p class="md-p">
      I love being around tech communities, and helping out at events is one of my favourite things to do.
    </p>

    <h2 class="md-h2">GitHub Campus Expert</h2>
    <p class="md-p">
      I'm a <strong>GitHub Campus Expert</strong>. Campus Experts are students who help build tech
      communities around them, by running events, helping others get started with Git and GitHub,
      and supporting hackathons. If you see someone in a red hoodie at an event, I belong to that crew!
    </p>

    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-role">PEC Hacks 2024</div>
          <div class="timeline-period">2024</div>
          <span class="event-role">GitHub Campus Expert</span>
          <ul class="timeline-list">
            <li>Represented GitHub at the hackathon and helped participants with Git and GitHub.</li>
            <li>Shared GitHub Education resources like the Student Developer Pack.</li>
          </ul>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-role">DevsHouse 2025</div>
          <div class="timeline-period">2025 &middot; VIT Chennai</div>
          <span class="event-role">GitHub Campus Expert</span>
          <ul class="timeline-list">
            <li>Represented GitHub at the hackathon and helped participants with Git and GitHub.</li>
            <li>Shared GitHub Education resources like the Student Developer Pack.</li>
          </ul>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-role">NMIT Hacks 2025</div>
          <div class="timeline-period">2025 &middot; Bengaluru</div>
          <span class="event-role">GitHub Campus Expert</span>
          <ul class="timeline-list">
            <li>Represented GitHub at the hackathon and helped participants with Git and GitHub.</li>
            <li>Shared GitHub Education resources like the Student Developer Pack.</li>
          </ul>
        </div>
      </div>
    </div>

    <h2 class="md-h2">Volunteering</h2>
    <p class="md-p">
      I also enjoy volunteering at tech events and helping things run smoothly behind the scenes.
    </p>

    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-role">AgentsNexus 2025</div>
          <div class="timeline-period">2025</div>
          <span class="event-role">Volunteer Management</span>
          <ul class="timeline-list">
            <li>Coordinated the volunteer team and assigned roles for the event.</li>
            <li>Helped keep the event running smoothly on the day.</li>
          </ul>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-content">
          <div class="timeline-role">AgentsNexus 2026</div>
          <div class="timeline-period">2026 &middot; Bengaluru &middot; part of Bengaluru Tech Week 2026</div>
          <span class="event-role">Volunteer Management</span>
          <ul class="timeline-list">
            <li>Coordinated the volunteer team and assigned roles for the event.</li>
            <li>Helped keep the event running smoothly on the day.</li>
          </ul>
        </div>
      </div>
    </div>
  `,

  blogposts: () => `
    <h1 class="md-h1">Blog Posts</h1>
    <p class="md-p">
      Writing about things I'm learning, building, or thinking about.
    </p>
    <div id="blogPostList" class="blog-list">
      <div class="blog-empty">Loading posts&hellip;</div>
    </div>
  `,

  // ── Connect with me pages ─────────────────────────────────────────────────
  'connect-github': () => connectPage(
    'GitHub', '@smruthi49', '&#x1F419;',
    'https://github.com/smruthi49',
    'My code and projects.',
    '#6e9f3c', 'View Profile on GitHub'
  ),

  'connect-linkedin': () => connectPage(
    'LinkedIn', 'smruthi-balaji', '&#x1F4BC;',
    'https://www.linkedin.com/in/smruthi-balaji',
    'Professional background, experience and network.',
    '#4a9eca', 'Connect on LinkedIn'
  ),

  'connect-x': () => connectPage(
    'X', '@smoothie4x', '&#x1D54F;',
    'https://x.com/smoothie4x',
    'Random thoughts, events and things I find interesting.',
    '#e7e7e7', 'Follow on X'
  )
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function connectPage(platform, handle, icon, url, desc, color, cta) {
  return '<div class="connect-page">'
    + '<div class="connect-hero" style="border-left-color:' + color + '">'
    + '<div class="connect-icon">' + icon + '</div>'
    + '<div class="connect-info">'
    + '<div class="connect-platform" style="color:' + color + '">' + platform + '</div>'
    + '<div class="connect-handle">' + handle + '</div>'
    + '<div class="connect-desc">' + desc + '</div>'
    + '</div></div>'
    + '<a href="' + url + '" target="_blank" class="connect-cta" style="--cta-color:' + color + '">'
    + cta + ' &rarr;</a>'
    + '</div>';
}
