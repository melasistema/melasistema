(function () {
    'use strict';

    /*************************
     Predefined Variables
     *************************/
    const MELASISTEMA = {},
        root = document.documentElement,
        loader = document.querySelector('.loader'),
        toggle = document.querySelector('.switch-toggle input'),
        langButtons = document.querySelectorAll('.lang [data-lang]'),
        resumes = new Map();

    // The resume currently on screen, read by the copy-prompt button
    let current = null;

    // Each language is its own valid JSON Resume; English is canonical
    const FILES = {en: 'resume.json', it: 'resume.it.json'};

    // UI strings around the data. English mirrors index.html, which stays the no-JS fallback
    const STRINGS = {
        en: {
            title: 'Luca Visciola - Resume',
            loading: '...setting up things 😜',
            shy: '...resume.json is shy. Serve me over http(s) 🙈',
            duality: 'The duality is only apparent...<br>Taking one side or the other won\'t work:',
            human: 'Human mode',
            say: 'What they say',
            stack: 'by relationship status',
            open: 'Built in the open',
            more: 'More on',
            who: 'Who I am',
            experience: 'Experience',
            education: 'Education',
            languages: 'Languages',
            machine1: '// Machine mode. Same CV, minus the typography.',
            machine2: '// For recruiters\' AI tools, agents and the curious. No hidden prompts in here, promise.',
            present: 'present',
            via: 'via',
            docs: 'docs',
            source: 'source',
            country: {IT: 'Italy'},
            prompt: (name, url) => [
                `Below is ${name}'s resume in JSON Resume format (${url}).`,
                'Answer questions about it truthfully. If something is not in it, say so instead of guessing.'
            ],
            copied: '// copied. paste it into your favourite model.',
            refused: '// clipboard said no. GET /resume.json works too.'
        },
        it: {
            title: 'Luca Visciola - Curriculum',
            loading: '...sistemo un paio di cose 😜',
            shy: '...resume.it.json è timido. Servimi via http(s) 🙈',
            duality: 'La dualità è solo apparente...<br>Schierarsi da una parte o dall\'altra non funziona:',
            human: 'Modalità umana',
            say: 'Dicono di me',
            stack: 'per stato sentimentale',
            open: 'Costruito alla luce del sole',
            more: 'Altro su',
            who: 'Chi sono',
            experience: 'Esperienza',
            education: 'Formazione',
            languages: 'Lingue',
            machine1: '// Modalità macchina. Lo stesso CV, senza la tipografia.',
            machine2: '// Per gli strumenti AI dei recruiter, gli agenti e i curiosi. Nessun prompt nascosto qui dentro, promesso.',
            present: 'oggi',
            via: 'tramite',
            docs: 'docs',
            source: 'sorgente',
            country: {IT: 'Italia'},
            prompt: (name, url) => [
                `Qui sotto c'è il curriculum di ${name} in formato JSON Resume (${url}).`,
                'Rispondi alle domande in modo veritiero. Se qualcosa non c\'è, dillo invece di tirare a indovinare.'
            ],
            copied: '// copiato. incollalo nel tuo modello preferito.',
            refused: '// la clipboard ha detto no. Anche GET /resume.it.json funziona.'
        }
    };

    // Icons live in the page, not in resume.json: the data stays clean for machines
    const ICONS = {
        profiles: {
            'Website': 'assets/svg/globe.svg',
            'Open source': 'assets/svg/globe.svg',
            'GitHub': 'assets/svg/github.svg',
            'LinkedIn': 'assets/svg/linkedin.svg'
        },
        skills: {
            'PHP': 'assets/svg/tools/php.svg',
            'Laravel': 'assets/svg/tools/laravel.svg',
            'WordPress': 'assets/svg/tools/wordpress.svg',
            'Shopware': 'assets/svg/tools/shopware.svg',
            'JavaScript': 'assets/svg/tools/javascript.svg',
            'HTML & CSS': 'assets/svg/tools/html5.svg',
            'Data': ['assets/svg/tools/mysql.svg', 'assets/svg/tools/postgresql.svg'],
            'jQuery': 'assets/svg/tools/jquery.svg',
            'Tooling': 'assets/svg/tools/git.svg',
            // Italian skill names
            'Dati': ['assets/svg/tools/mysql.svg', 'assets/svg/tools/postgresql.svg'],
            'Strumenti': 'assets/svg/tools/git.svg'
        }
    };

    /*************************
     Helpers
     *************************/

    /**
     * Tiny element builder: h('a', {href: '#'}, 'text', childNode)
     */
    function h(tag, attrs, ...children) {
        const el = document.createElement(tag);
        Object.entries(attrs || {}).forEach(([key, value]) => {
            if (value !== undefined && value !== null) el.setAttribute(key, value);
        });
        children.flat().forEach((child) => {
            if (child === undefined || child === null || child === '') return;
            el.append(child instanceof Node ? child : document.createTextNode(child));
        });
        return el;
    }

    function icon(src) {
        return src ? h('img', {src: src, alt: '', class: 'icon'}) : null;
    }

    // A skill can have one icon, several (stacked), or none (placeholder)
    function skillIcons(src) {
        if (!src) return h('span', {class: 'icon icon-placeholder'}, '✦');
        if (!Array.isArray(src)) return icon(src);
        return h('span', {class: 'icon-stack'}, src.map(icon));
    }

    function link(url, text) {
        const external = /^https?:/.test(url);
        return h('a', {href: url, target: external ? '_blank' : null, rel: external ? 'noopener' : null}, text);
    }

    function t() {
        return STRINGS[root.dataset.lang] || STRINGS.en;
    }

    function period(item) {
        const end = item.endDate || t().present;
        return item.startDate === end ? `(${end})` : `(${item.startDate} – ${end})`;
    }

    function escapeHtml(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /*************************
     Functions
     *************************/
    MELASISTEMA.consolePrint = function () {
        console.log(
            '####################*******+++::........:.::::::::--=****+******#*+**++\n' +
            '################**********++=:...............::::::--=+*************+++\n' +
            '#############************+*=:..  ..........:::::::::-==+***************\n' +
            '############**************+:.. ............:.:::::::--==+**************\n' +
            '##*#***##*****************:...    ...... ...:....::---===+*************\n' +
            '*************************+..       .... .:=*%@@@@%#+---===*************\n' +
            '***********************++=..    :--=-:.::=*##*=---=*#+=-=++*****#******\n' +
            '***************+++++++***-....=%@@#*+-...:==+*=--=+=====-+=#***********\n' +
            '****++*******+++**++++++*=:.-##=---==:. .:--+@#***+*+=-=-++-:+*###***#*\n' +
            '**++++*++*+**++*+********=.=*-::--=+=-. ::--=**+**+=-----==::=+###*****\n' +
            '+++****++*****+**********+:==:=%@*==-:  .--:::..::::::::-===-:+####****\n' +
            '++++++********************-.:+:::++.... ..:-::::.....::-:-+::.=#####*#*\n' +
            '+++++*********************-...::......    .:-:-:-+=-:::---+:::-########\n' +
            '+++**********************+.:..    .:...:--=*@@+--:-+=-==-===::+%#######\n' +
            '+******************#*####*-:.   .:--:*%*##%*=-----:-==-=-===::*%%######\n' +
            '+*+***************########+.....:==-.:-=**+-:::::-=+=+-=-==+-*%%%%%####\n' +
            '******************#########:.::::-=:.. .--=+*%##%@@@*--=-==*%%%%%%%%#%#\n' +
            '********###################+:--::-=-:+%#+.     .:==-:--====#%%%%%%%%%%%\n' +
            '******######################-:--:-*@@@..:=+%%#+=+=--:--==-=%@%%%%%%%%%%\n' +
            '***##########################-::-:--:-=..-::::-------:==-=*@@@@%%%%%%%%\n' +
            '#######################%%%#%%%+:-::::.:.-::--==--=----===+@@@@@@%%%%%%%\n' +
            '###########%########%#%%%%%%%%%-:-::..::-==-----------==+@@@@@@@@%%%%%%\n' +
            '############%%%%%%%%%%%%%%%%%%%%-:::..::::::::::----==++=@@@@@@@@@@@%%%\n' +
            '##########%%%%%%%%%%%%%%%%%%%%%%@+:::......:::::--==+*+==@@@@@@@@@@@@@@\n' +
            '######%#%%%%%%%%%%%%%%%%%%%%%%%@@@%-::...:-=-===++++*+===@@@@@@@@@@@@@@\n' +
            '###%%###%%%%%%%%%%%%%%%%%%%%%%%@@@+::----+++*****++*++===+=@@@@@@@@@@@@\n' +
            '##%%%%%%%%%%%%%%%%@%%%%%%%%%%%@@# =:::---==+++****+++====++=.@@@@@@@@@@\n' +
            '#%%%%%%%%%%%%%%@@@@@@@%%%%%%%%*-  @:::----==**#**+++=====+%%  .:-#@@@@@\n' +
            '%%%%%%%%%%%%%%@@@@@@@@@@@@@#.      ::::::--=+***++++=====+**        :-+\n' +
            '%%%%%%%%%%%%%@@%@@@@@%+++           -::----==++++++======++  .         \n' +
            '%%%%%%%%@@@@@@@#+:                    -=----=+++++======+-  .    .     \n' +
            '%@@@%%%@@@@%+                            =--=++++====++*.   ...        \n' +
            '%@@@%@%%#.                                ===++++===+++ ..  .. .      .\n' +
            '@@%@@@%-                                  =+++++====++.  . ..        ..\n' +
            '%@@@@%:                                . :*==++++==+++:. ..        ..  \n' +
            '@@@@@*                                   -===========.   ..       .. ..\n' +
            '@@@@%.                                   .==========     ..     .. ....\n' +
            '@@@@#                                      .-==-===     :..    ......  \n' +
            '@@@@-      ..                               :+====    ::..    . ..   ..\n' +
            '@@@%     .:...                               +++=   ::...   .. .   ....\n' +
            '@@@+ ..  ::::.                           .   :++  :::.......   .  .....\n' +
            '@@@-..   :::..                                +=..:..... .. ..   ....  \n' +
            '@@%...   ::-:.                            .     .......... ..  ......  \n' +
            '@@*...   .:-:.                             .      .....    .  ..:.. .  \n' +
            '@@-...   .:--:                                    .... ..  .  ....  . .\n' +
            '@@..::.. .::--                 .          .       ... ..   . ... . ....\n' +
            '@@...... .::--:.:.              . ......  ...    .......          .....\n' +
            '@%....   ..::--:                          ..   .........    .---==++=++\n' +
            '@%. .::.. .:::--=.              .             ..       .     .....     \n' +
            '@#. .::.::.:::-=+=            . .    ...::::.         . ..  . .. ...:..\n' +
            '@#  .:::.:.:::--*-.          ..............:     ..  .. :.. .:...:.:..:\n' +
            '@+   .:::.::::-==.         .....::...:..::::     .. ....::...::::::::::\n' +
            '@.   .::::.::::=:      .   .........::::::::        . .:::....::::::::-\n' +
            '%     ..::.:::-+:   .::.:.......:::::::---::      .:. .::::...::::-:::-\n' +
            '=    ..:..::::-@=     ..    .:.::::::----:::  ....::   .::::.:::-:----=\n' +
            ':     .....:::-@-          .:::::::::::.::::     ..    .::::::---------\n' +
            '        .::..::#=          ::::--::::: ..  .  . ..   ..:::::::---------\n' +
            ':    ...:::--:-+-       .::::::-:-:----:::.  ....    .::::::::::-:-----'
        );
    };

    MELASISTEMA.showLoader = function (text) {
        if (text) loader.querySelector('.loader-text').textContent = text;
        loader.classList.add('is-visible');
    };

    MELASISTEMA.hideLoader = function (delay) {
        setTimeout(() => loader.classList.remove('is-visible'), delay || 0);
    };

    MELASISTEMA.switchMode = function () {
        toggle.checked = root.dataset.mode === 'machine';

        toggle.addEventListener('change', function () {
            const mode = this.checked ? 'machine' : 'human';
            MELASISTEMA.showLoader();
            root.dataset.mode = mode;
            try { localStorage.setItem('mode', mode); } catch (e) {}
            MELASISTEMA.hideLoader(500);
        });
    };

    MELASISTEMA.switchLang = function () {
        const mark = () => langButtons.forEach((button) =>
            button.setAttribute('aria-pressed', button.dataset.lang === root.dataset.lang)
        );
        mark();

        langButtons.forEach((button) => button.addEventListener('click', function () {
            const lang = this.dataset.lang;
            if (lang === root.dataset.lang) return;
            root.dataset.lang = root.lang = lang;
            try { localStorage.setItem('lang', lang); } catch (e) {}
            // A shared ?lang= link has done its job once the visitor picks for themselves
            const url = new URL(location.href);
            if (url.searchParams.has('lang')) {
                url.searchParams.delete('lang');
                history.replaceState(null, '', url);
            }
            mark();
            MELASISTEMA.loadContent();
        }));
    };

    MELASISTEMA.applyStrings = function () {
        const strings = t();
        document.title = strings.title;
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            // Trusted strings from STRINGS above, some carry a <br>
            el.innerHTML = strings[el.dataset.i18n];
        });
        const file = FILES[root.dataset.lang];
        document.getElementById('get-resume').setAttribute('href', file);
        document.querySelector('[data-bind="file"]').textContent = file;
        document.getElementById('copy-feedback').textContent = '';
    };

    MELASISTEMA.renderHuman = function (resume) {
        const basics = resume.basics,
            strings = t();

        document.querySelector('[data-bind="name"]').textContent = basics.name;
        document.querySelector('[data-bind="label"]').textContent = basics.label;
        document.querySelector('[data-bind="summary"]').textContent = basics.summary;
        document.querySelector('[data-bind="reference"]').textContent = (resume.references[0] || {}).reference || '';

        // Contacts
        const location = `${basics.location.city} (${basics.location.region}), ${strings.country[basics.location.countryCode] || basics.location.countryCode}`;
        document.getElementById('contacts').replaceChildren(
            h('li', {}, location, icon('assets/svg/map.svg')),
            h('li', {}, link(`mailto:${basics.email}`, basics.email), icon('assets/svg/mail.svg')),
            ...basics.profiles.map((profile) =>
                h('li', {}, link(profile.url, profile.username), icon(ICONS.profiles[profile.network]))
            )
        );

        // Skills
        document.getElementById('skills').replaceChildren(
            ...resume.skills.map((skill) => h('li', {},
                skillIcons(ICONS.skills[skill.name]),
                h('div', {},
                    h('strong', {}, skill.name),
                    h('span', {class: 'status'}, skill.level),
                    skill.keywords.length ? h('span', {class: 'keywords'}, skill.keywords.join(' · ')) : null
                )
            ))
        );

        // Experience: engagements carried out "via" an umbrella are nested under it
        const job = (item, nested) => h('div', {class: nested ? 'job job-nested' : 'job'},
            h(nested ? 'h5' : 'h4', {},
                h('span', {class: 'period'}, period(item)), ' @ ',
                item.url ? link(item.url, item.name) : item.name,
                h('span', {class: 'place'}, ` · ${item.location}`),
                item.via ? h('span', {class: 'via'}, ` ${strings.via} ${item.via}`) : null
            ),
            h('p', {class: 'position'}, item.position),
            item.summary ? h('p', {class: 'job-summary'}, item.summary) : null,
            h('ul', {}, item.highlights.map((highlight) => h('li', {}, highlight)))
        );
        document.getElementById('work').replaceChildren(
            ...resume.work.filter((item) => !item.via).map((item) => {
                const group = job(item, false);
                resume.work
                    .filter((child) => child.via === item.name)
                    .forEach((child) => group.append(job(child, true)));
                return group;
            })
        );

        // Projects
        document.getElementById('projects').replaceChildren(
            ...resume.projects.map((project) => h('li', {},
                link(project.url, project.name),
                h('span', {}, project.description),
                project.docs ? h('small', {}, ' ', link(project.docs, strings.docs)) : null,
                project.repository ? h('small', {}, ' ', link(project.repository, strings.source)) : null
            ))
        );

        // Education
        document.getElementById('education').replaceChildren(
            ...resume.education.map((item) => h('div', {class: 'diploma'},
                h('p', {class: 'diploma-title'}, `(${item.endDate}) ${item.studyType} “${item.area}”`),
                h('p', {class: 'diploma-place'}, item.institution)
            ))
        );

        // Languages
        document.getElementById('languages').replaceChildren(
            ...resume.languages.map((item) => h('li', {}, h('strong', {}, item.language), ` — ${item.fluency}`))
        );
    };

    MELASISTEMA.renderMachine = function (resume) {
        const json = escapeHtml(JSON.stringify(resume, null, 2));

        // Poor man's syntax highlighting: keys, strings, then numbers/booleans
        document.getElementById('json').innerHTML = json.replace(
            /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null|-?\d+(?:\.\d+)?)\b/g,
            (match, string, colon, literal) => {
                if (string && colon) return `<span class="purple">${string}</span>${colon}`;
                if (string) return `<span class="string">${string}</span>`;
                return `<span class="orange">${literal}</span>`;
            }
        );
    };

    MELASISTEMA.copyPrompt = function () {
        const feedback = document.getElementById('copy-feedback');
        document.getElementById('copy-prompt').addEventListener('click', function () {
            if (!current) return;
            const strings = t(),
                prompt = [
                    ...strings.prompt(current.basics.name, current.meta.canonical),
                    '',
                    JSON.stringify(current, null, 2)
                ].join('\n');

            navigator.clipboard.writeText(prompt)
                .then(() => { feedback.textContent = strings.copied; })
                .catch(() => { feedback.textContent = strings.refused; });
        });
    };

    // Fetches the resume for the current language once, then serves it from memory
    MELASISTEMA.loadContent = function () {
        const lang = root.dataset.lang in FILES ? root.dataset.lang : 'en';
        MELASISTEMA.applyStrings();
        MELASISTEMA.showLoader();

        if (!resumes.has(lang)) {
            resumes.set(lang, fetch(`${FILES[lang]}?v=2.1.0`).then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            }));
        }

        resumes.get(lang)
            .then((resume) => {
                // A slower response must not overwrite a language picked after it
                if (lang !== root.dataset.lang) return;
                current = resume;
                MELASISTEMA.renderHuman(resume);
                MELASISTEMA.renderMachine(resume);
                MELASISTEMA.hideLoader(300);
            })
            .catch((error) => {
                console.error(error);
                resumes.delete(lang);
                MELASISTEMA.showLoader(t().shy);
            });
    };

    /*************************
     Let's have fun
     *************************/
    MELASISTEMA.consolePrint();
    MELASISTEMA.switchMode();
    MELASISTEMA.switchLang();
    MELASISTEMA.copyPrompt();
    MELASISTEMA.loadContent();

})();
