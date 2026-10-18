(function () {
    'use strict';

    /*************************
     Predefined Variables
     *************************/
    const MELASISTEMA = {},
        root = document.documentElement,
        loader = document.querySelector('.loader'),
        toggle = document.querySelector('.switch-toggle input');

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
            'Tooling': 'assets/svg/tools/git.svg'
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

    function period(item) {
        const end = item.endDate || 'present';
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

    MELASISTEMA.renderHuman = function (resume) {
        const basics = resume.basics;

        document.querySelector('[data-bind="name"]').textContent = basics.name;
        document.querySelector('[data-bind="label"]').textContent = basics.label;
        document.querySelector('[data-bind="summary"]').textContent = basics.summary;
        document.querySelector('[data-bind="reference"]').textContent = (resume.references[0] || {}).reference || '';

        // Contacts
        const location = `${basics.location.city} (${basics.location.region}), ${basics.location.countryCode === 'IT' ? 'Italy' : basics.location.countryCode}`;
        document.getElementById('contacts').append(
            h('li', {}, location, icon('assets/svg/map.svg')),
            h('li', {}, link(`mailto:${basics.email}`, basics.email), icon('assets/svg/mail.svg')),
            ...basics.profiles.map((profile) =>
                h('li', {}, link(profile.url, profile.username), icon(ICONS.profiles[profile.network]))
            )
        );

        // Skills
        document.getElementById('skills').append(
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
                item.via ? h('span', {class: 'via'}, ` via ${item.via}`) : null
            ),
            h('p', {class: 'position'}, item.position),
            item.summary ? h('p', {class: 'job-summary'}, item.summary) : null,
            h('ul', {}, item.highlights.map((highlight) => h('li', {}, highlight)))
        );
        document.getElementById('work').append(
            ...resume.work.filter((item) => !item.via).map((item) => {
                const group = job(item, false);
                resume.work
                    .filter((child) => child.via === item.name)
                    .forEach((child) => group.append(job(child, true)));
                return group;
            })
        );

        // Projects
        document.getElementById('projects').append(
            ...resume.projects.map((project) => h('li', {},
                link(project.url, project.name),
                h('span', {}, project.description),
                project.docs ? h('small', {}, ' ', link(project.docs, 'docs')) : null,
                project.repository ? h('small', {}, ' ', link(project.repository, 'source')) : null
            ))
        );

        // Education
        document.getElementById('education').append(
            ...resume.education.map((item) => h('div', {class: 'diploma'},
                h('p', {class: 'diploma-title'}, `(${item.endDate}) ${item.studyType} “${item.area}”`),
                h('p', {class: 'diploma-place'}, item.institution)
            ))
        );

        // Languages
        document.getElementById('languages').append(
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

        const feedback = document.getElementById('copy-feedback');
        document.getElementById('copy-prompt').addEventListener('click', function () {
            const prompt = [
                `Below is ${resume.basics.name}'s resume in JSON Resume format (${resume.meta.canonical}).`,
                'Answer questions about it truthfully. If something is not in it, say so instead of guessing.',
                '',
                JSON.stringify(resume, null, 2)
            ].join('\n');

            navigator.clipboard.writeText(prompt)
                .then(() => { feedback.textContent = '// copied. paste it into your favourite model.'; })
                .catch(() => { feedback.textContent = '// clipboard said no. GET /resume.json works too.'; });
        });
    };

    MELASISTEMA.loadContent = function () {
        MELASISTEMA.showLoader();

        fetch('resume.json?v=2.0.0')
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then((resume) => {
                MELASISTEMA.renderHuman(resume);
                MELASISTEMA.renderMachine(resume);
                MELASISTEMA.hideLoader(300);
            })
            .catch((error) => {
                console.error(error);
                MELASISTEMA.showLoader('...resume.json is shy. Serve me over http(s) 🙈');
            });
    };

    /*************************
     Let's have fun
     *************************/
    MELASISTEMA.consolePrint();
    MELASISTEMA.switchMode();
    MELASISTEMA.loadContent();

})();
