(function( $ ) {
    'use strict';

    /*************************
     Predefined Variables
     *************************/
    const MELASISTEMA = {},
        $window = $(window),
        $document = $(document),
        $body = $('body');

    //Check if function exists
    $.fn.exists = function () {
        return this.length > 0;
    };

    /**
     * Shared content
     * @type {{who_am_i: {description: string}, personal_info: {birthdate: string, job_titles: string[], phone: string, name: string, location: string, email: string, social_media: {github: string, linkedin: string}}, education: [{institution: string, year: string, degree: string},{institution: string, year: string, degree: string}], languages: string[], competencies: {skills: string[], tools: string[]}, experience: [{end_date: string, company_name: string, roles: string[], location: string, start_date: string},{end_date: string, company_name: string, roles: string[], location: string, start_date: string},{end_date: string, company_name: string, roles: string[], location: string, start_date: string},{end_date: string, company_name: string, roles: string[], location: string, start_date: string},{end_date: string, company_name: string, roles: string[], location: string, start_date: string},null,null,null], about_me: {description: string}}}
     */
    const jsonData = {

        "personal_info": {
            "name": "LUCA VISCIOLA",
            "job_titles": {
                "job_title_one": "Full Stack Developer",
                "job_title_two": "Technology Consultant"
            },
            "birthdate": "09 Aprile 1983",
            "location": "Laives (BZ), ITALY",
            "phone": "+39 333.0000000",
            "email": {
                "text": "info@melasistema.com",
                "url": "mailto:info@melasistema.com",
            },
            "social_media": {
                "linkedin": {
                    "url": "https://www.linkedin.com/in/luca-visciola/",
                    "text": "luca-visciola"
                },
                "github": {
                    "url": "https://github.com/melasistema/",
                    "text": "melasistema",
                },
            }
        },
        "about_me": {
            "heading": "DICONO DI ME",
            "text": "Voglioso di cogliere ogni possibilità per migliorare le proprie conoscenze. Tanto deciso quanto aperto nella sua visione strategica. A suo agio nella gestione di situazioni critiche."
        },
        "competencies": {
            "heading": "COMPETENZE",
            "skills": {
                "php": "PHP",
                "html5": "HTML",
                "css3": "CSS3",
                "js": "JS",
                "shopware": "SHOPWARE",
                "laravel": "LARAVEL",
                "wordpress": "WORDPRESS"
            },
            "tools": {
                "heading": "TOOLS + UTILIZZATI",
            }
        },
        "who_i_am": {
            "heading": "CHI SONO",
            "text": "Full Stack Developer e Technology Consultant con una solida esperienza decennale nel supporto di startups, aziende e agenzie, per guidarle verso il successo e la realizzazione dei loro obiettivi e delle aspettative dei loro clienti. Durante il mio percorso, ho affinato le mie competenze e acquisito una profonda comprensione delle dinamiche aziendali, permettendomi di fornire soluzioni tecnologiche innovative e su misura."
        },
        "experience": {
            "groups": {
                "melasistema": {
                    "heading": "<b>(2009 - presente)</b>  @ <b><a href=\"https://melasistema.com\" target=\"_blank\">Melasistema</a></b> - Laives (BZ)",
                    "sub_groups": [
                        {
                            "text": "<p><b>(2022 - presente)</b> @ <b><a href=\"https://functionalcompany.com\" target=\"_blank\">Functional Srl</a></b> | Bolzano (BZ)</p>",
                            "roles": [
                                "Shopware based platforms developer",
                                "ERP Connector developer",
                                "Laravel micro services developer",
                                "Wordpress developer"
                            ]
                        },
                        {
                            "text": "<p><b>(2021 - 2022)</b> @ <b>Aliante Money Srl</b> | Salerno (SA)</p>",
                            "roles": [
                                "API’s Engineering per servizi di comunicazione con istituti bancari",
                                "Microservices developer per gestionali aziendali e servizi interni",
                                "Admin dashboard developer per gestione API’s e Microservices",
                                "Frontend developer multi-role",
                                "Technology Consultant"
                            ]
                        },
                        {
                            "text": "<p><b>(2020 - 2022)</b> @ <b>EOC Srl </b> | Laives (BZ)</p>",
                            "roles": [
                                "Wordpress developer",
                                "Woocommerce developer",
                                "Wordpress plugin developer",
                                "Technology consultant per l’azienda e clienti"
                            ]
                        },
                        {
                            "text": "<p><b>(2019 - 2020)</b> @ <b>Goodify Società Benefit </b> | Bolzano (BZ)</p>",
                            "roles": [
                                "Developer’s team coordinator",
                                "API’s integrator",
                                "CRM Integrator",
                                "Marketing Automation integrator",
                                "Graphics visualizer for print and digital"
                            ]
                        },
                        {
                            "text": "<p><b>(2017 - 2019)</b> @ <b>Tooly Tips Srl </b> | Bolzano (BZ)</p>",
                            "roles": [
                                "Backend developer",
                                "Frontend developer",
                                "Services and customer panels developer",
                                "Ticketing System developer",
                                "Funneling and lead generator system developer",
                                "API’s integrator",
                                "Technology Consultant"
                            ]
                        },
                        {
                            "text": "<p><b>(2009 - presente)</b> @ <b>Melasistema </b> | Laives (BZ)</p>",
                            "roles": [
                                "Custom web solutions and software developer",
                                "2D/3D Graphics designer & animator",
                                "Sound and Video editor"
                            ]
                        },
                    ]
                },
                "radionbc": {
                    "heading": "<b>(2014 - 2017)</b>  @ <b>Radio NBC</b> - Bolzano (BZ)",
                    "sub_groups": [
                        {
                            "roles": [
                                "Sincronizzazione flussi radiofonici su piattaforme web",
                                "Audio/Video Conversion/Publishing system developer",
                                "Backend developer",
                                "API’s integrator"
                            ]
                        }
                    ]
                }
            }
        },
        "education": {
            "heading": "EDUCAZIONE",
            "diploma": [
                {
                    "title": "(2005) Diploma “Advanced Drummer”",
                    "location": "Drummer Collective di New York (USA)",
                },
                {
                    "title": "(2003) Diploma superiore “Dirigente di comunità”",
                    "location": "I.I.S artistica e per geometri di Terni (TR)",
                },
            ]

        },
        "language": {
            "heading": "LINGUE",
            "text": "Madrelingua Italiana e ottima conoscenza della lingua inglese"
        }
    };

    /*************************
     Functions
     +*************************/
    MELASISTEMA.consolePrint = function() {
        console.log('####################*******+++::........:.::::::::--=****+******#*+**++\n' +
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
            ':    ...:::--:-+-       .::::::-:-:----:::.  ....    .::::::::::-:-----');
    }

    /**
     *
     * @param isBackendTheme
     */
    /*function toggleTheme(isBackendTheme) {
        $("#frontendTheme").prop("disabled", isBackendTheme);
        $("#backendTheme").prop("disabled", !isBackendTheme);
        $('.backend-elements').toggle(isBackendTheme);
        $('.frontend-elements').toggle(!isBackendTheme);
    }*/

    function toggleTheme(isBackendTheme) {
        // Show the loader and loader background
        $('.loader').show();
        $('.loader-background').show();

        // Use setTimeout to create a delay
        setTimeout(function() {
            $("#frontendTheme").prop("disabled", isBackendTheme);
            $("#backendTheme").prop("disabled", !isBackendTheme);
            $('.backend-elements').toggle(isBackendTheme);
            $('.frontend-elements').toggle(!isBackendTheme);

            // Hide the loader and loader background
            $('.loader').hide();
            $('.loader-background').hide();
        }, 500); // Delay in milliseconds
    }

    MELASISTEMA.switchMode = function() {
        const switchToggleInput = $(".switch-toggle input");

        // Check for existing theme preference on page load
        const savedTheme = localStorage.getItem('theme');
        const isBackendTheme = savedTheme === 'backend';
        toggleTheme(isBackendTheme);

        // Set the switch's checked state based on the saved theme
        switchToggleInput.prop('checked', isBackendTheme);

        switchToggleInput.change(function() {
            const isBackendTheme = $(this).is(":checked");
            localStorage.setItem('theme', isBackendTheme ? 'backend' : 'frontend');
            toggleTheme(isBackendTheme);
        });
    };

    MELASISTEMA.loadContent = function() {

        // Left Column
        // Frontend Heading
        $('h1.resume-name').text(jsonData.personal_info.name);
        $('.resume-job-position-one').text(jsonData.personal_info.job_titles.job_title_one);
        $('.resume-job-position-two').text(jsonData.personal_info.job_titles.job_title_two);
        // Backend Heading
        $('span.resume-name-backend').text(jsonData.personal_info.name);
        $('.resume-job-position-one-backend').text(jsonData.personal_info.job_titles.job_title_one);
        $('.resume-job-position-two-backend').text(jsonData.personal_info.job_titles.job_title_two);

        // Frontend Personal Info
        $('p.birthday').prepend(jsonData.personal_info.birthdate + ' ');
        $('p.location').prepend(jsonData.personal_info.location + ' ');
        $('p.phone span.blurry-out').prepend(jsonData.personal_info.phone + ' ');
        $('p.email a').attr('href', jsonData.personal_info.email.url).text(jsonData.personal_info.email.text);
        // Set social media links
        const socialMediaLinks = jsonData.personal_info.social_media;
        $('p.linkedin a').attr('href', socialMediaLinks.linkedin.url).text(socialMediaLinks.linkedin.text);
        $('p.github a').attr('href', socialMediaLinks.github.url).text(socialMediaLinks.github.text);
        // Backend Personal info
        $('span.birthday').prepend(jsonData.personal_info.birthdate + ' ');
        $('span.location').prepend(jsonData.personal_info.location + ' ');
        $('span.email a').attr('href', jsonData.personal_info.email.url).text(jsonData.personal_info.email.text);
        $('span.linkedin a').attr('href', socialMediaLinks.linkedin.url).text(socialMediaLinks.linkedin.text);
        $('span.github a').attr('href', socialMediaLinks.github.url).text(socialMediaLinks.github.text);

        // Other Saying
        // Frontend Heading
        $('h3.about-me-heading').text(jsonData.about_me.heading);
        $('p.about-me-text').text(jsonData.about_me.text);

        $('span.about-me-text').text(jsonData.about_me.text);

        $('h3.competencies-heading').text(jsonData.competencies.heading);
        $('h3.competencies-php').text(jsonData.competencies.skills.php);
        $('h3.competencies-html5').text(jsonData.competencies.skills.html5);
        $('h3.competencies-css3').text(jsonData.competencies.skills.css3);
        $('h3.competencies-js').text(jsonData.competencies.skills.js);
        $('h3.competencies-shopware').text(jsonData.competencies.skills.shopware);
        $('h3.competencies-laravel').text(jsonData.competencies.skills.laravel);
        $('h3.competencies-wordpress').text(jsonData.competencies.skills.wordpress);

        $('h3.tools-heading').text(jsonData.competencies.tools.heading);

        // Right Column
        $('h3.who-i-am-heading').text(jsonData.who_i_am.heading);
        $('p.who-i-am-text').text(jsonData.who_i_am.text);
        $('span.who-i-am-text').text(jsonData.who_i_am.text);

        // Experiences
        $('p.group-melasistema-heading').prepend(jsonData.experience.groups.melasistema.heading);
        $('p.group-radionbc-heading').prepend(jsonData.experience.groups.radionbc.heading);
        jsonData.experience.groups.melasistema.sub_groups.forEach(function(job) {
            // Create a new experience-sub-group element
            const experienceSubGroup = document.createElement('div');
            experienceSubGroup.classList.add('experience-sub-group');

            // Add the company information from the "text" property
            experienceSubGroup.innerHTML = job.text;

            // Create a new unordered list element for the roles
            const roleList = document.createElement('ul');

            // Loop through each role in the "roles" array
            job.roles.forEach(function(role) {
                // Create a new list item element for the current role
                const roleListItem = document.createElement('li');
                roleListItem.textContent = role;

                // Add the list item to the role list
                roleList.appendChild(roleListItem);
            });

            // Add the role list to the experience sub-group
            experienceSubGroup.appendChild(roleList);

            // Append the experience sub-group to the main container
            document.querySelector('.experience-group-melasistema.frontend-elements').appendChild(experienceSubGroup);
        });
        // Backend
        jsonData.experience.groups.melasistema.sub_groups.forEach(function(job) {
            // Create a new experience-sub-group element
            const experienceSubGroup = document.createElement('div');
            experienceSubGroup.classList.add('experience-sub-group');

            // Add the company information from the "text" property
            experienceSubGroup.innerHTML = job.text;

            // Create a new unordered list element for the roles
            const roleList = document.createElement('ul');

            // Loop through each role in the "roles" array
            job.roles.forEach(function(role) {
                // Create a new list item element for the current role
                const roleListItem = document.createElement('li');
                roleListItem.textContent = role;

                // Add the list item to the role list
                roleList.appendChild(roleListItem);
            });

            // Add the role list to the experience sub-group
            experienceSubGroup.appendChild(roleList);

            // Append the experience sub-group to the main container
            document.querySelector('.experience-group-melasistema.backend-elements').appendChild(experienceSubGroup);

        });

        jsonData.experience.groups.radionbc.sub_groups.forEach(function(job) {
            // Create a new experience-sub-group element
            const experienceSubGroup = document.createElement('div');
            experienceSubGroup.classList.add('experience-sub-group');


            // Create a new unordered list element for the roles
            const roleList = document.createElement('ul');

            // Loop through each role in the "roles" array
            job.roles.forEach(function(role) {
                // Create a new list item element for the current role
                const roleListItem = document.createElement('li');
                roleListItem.textContent = role;

                // Add the list item to the role list
                roleList.appendChild(roleListItem);
            });

            // Add the role list to the experience sub-group
            experienceSubGroup.appendChild(roleList);

            // Append the experience sub-group to the main container
            document.querySelector('.experience-group-radionbc').appendChild(experienceSubGroup);
        });
        // Backend
        jsonData.experience.groups.radionbc.sub_groups.forEach(function(job) {
            // Create a new experience-sub-group element
            const experienceSubGroup = document.createElement('div');
            experienceSubGroup.classList.add('experience-sub-group');

            // Create a new unordered list element for the roles
            const roleList = document.createElement('ul');

            // Loop through each role in the "roles" array
            job.roles.forEach(function(role) {
                // Create a new list item element for the current role
                const roleListItem = document.createElement('li');
                roleListItem.textContent = role;

                // Add the list item to the role list
                roleList.appendChild(roleListItem);
            });

            // Add the role list to the experience sub-group
            experienceSubGroup.appendChild(roleList);

            // Append the experience sub-group to the main container
            document.querySelector('.experience-group-radionbc.backend-elements').appendChild(experienceSubGroup);
        });

        // Education
        $('h3.education-heading').text(jsonData.education.heading);
        // Loop through diplomas and create elements
        jsonData.education.diploma.forEach(function(diploma) {

            // Create a container element for the diploma
            const diplomaSubGroup = document.createElement('div');
            diplomaSubGroup.classList.add('diploma-sub-group');

            // Create elements for title and location
            const title = document.createElement('p');
            title.classList.add('education-heading'); // Add specific class
            title.textContent = diploma.title;

            const location = document.createElement('p');
            location.classList.add('diploma-location'); // Add specific class
            location.textContent = diploma.location;

            // Append elements to the container
            diplomaSubGroup.appendChild(title);
            diplomaSubGroup.appendChild(location);


            // Append the container to the education group
            document.querySelector('.education-group.frontend-elements').appendChild(diplomaSubGroup);

        });
        // Backend
        jsonData.education.diploma.forEach(function(diploma) {

            // Create a container element for the diploma
            const diplomaSubGroup = document.createElement('div');
            diplomaSubGroup.classList.add('diploma-sub-group');

            // Create elements for title and location
            const title = document.createElement('p');
            title.classList.add('education-heading'); // Add specific class
            title.textContent = diploma.title;

            const location = document.createElement('p');
            location.classList.add('diploma-location'); // Add specific class
            location.textContent = diploma.location;

            // Append elements to the container
            diplomaSubGroup.appendChild(title);
            diplomaSubGroup.appendChild(location);


            // Append the container to the education group
            document.querySelector('.education-group.backend-elements').appendChild(diplomaSubGroup);
        });

        // Languages
        $('h3.language-heading').text(jsonData.language.heading);
        $('p.language-text').text(jsonData.language.text);
    }

    /*************************
     Let's have fun
     *************************/
    // Init Functions
    function init() {
        // console.log( 'init' );
    } init();

    // Document Ready functions
    $document.ready( function () {
        // console.log( 'document ready' );
        MELASISTEMA.consolePrint();
        MELASISTEMA.switchMode();
        MELASISTEMA.loadContent();

    });

    // Window Load functions
    window.onload = function () {
        const savedTheme = localStorage.getItem('theme');
        const isBackendTheme = savedTheme === 'backend';
        toggleTheme(isBackendTheme);
    }

})( jQuery );
