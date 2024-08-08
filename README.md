<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

/**
General Style
    Structure
 */
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
}
.left-column {
    flex: 1 1 auto;
    max-width: 350px;
    padding-right:50px;
}
.right-column {
    flex: 3 1 auto;
    max-width: 475px;
    border-left: 3px solid black;
    padding-left:50px;
}
/**
General Style
    Typography
 */
h1,h2,h3,h4,h5,h6 {
    font-family: "Rubik", sans-serif;
    font-optical-sizing: auto;
    color:black;
    font-weight: bold;
    font-style: normal;
    font-size:1.5rem;
    margin: unset;
    text-shadow: 0 2px 2px rgba(86, 86, 86, 0.2);
}
p {
    font-family: "Rubik", sans-serif;
    font-optical-sizing: auto;
    color:black;
}
a {
    text-decoration: none;
    color: black;
}
ul>li {
    font-family: "Rubik", sans-serif;
    color:black;
    font-size: 0.8rem;
    font-optical-sizing: auto;
    list-style: circle;
}

/**
General Style
    Helper classes
 */
.mt-2em {
    margin-top:2em;
}

.blurry-out {
    filter: blur(4px);
}

/**
Elements
    Separator
 */
.separator {
    width: 100%;
    height: 3px;
    background-color: black;
    margin: 7px 0px 7px 0px;
}
.separator.keep-right {
    float: right;
    width: 50px;
    margin-inline-start: 30px;
    margin-inline-end: 0px;
}
.separator.keep-left {
    width: 50px;
    margin-inline-start: 0px;
    margin-inline-end: 30px;
}

/**
Elements
    Slider
 */
.slider-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom:20px;
}
.slider {
    width: 200px;
    height: 7px;
    background-color: #ccc;
    position: relative;
}
.track {
    height: 100%;
    border-radius: 5px;
    background: linear-gradient(to right, #333, #000, #333); /* Adjust colors as needed */
}
.handle {
    position: absolute;
    top: -7px;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #545252;
    cursor: pointer;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.3);
    background: radial-gradient(circle at top, rgb(80, 80, 80), #1c1c1c);
}
.slider.slider-php .handle {
    left: 85%;
}
.slider.slider-html5 .handle {
    left: 85%;
}
.slider.slider-css3 .handle {
    left: 70%;
}
.slider.slider-js .handle {
    left: 75%;
}
.slider.slider-shopware .handle {
    left: 87%;
}
.slider.slider-laravel .handle {
    left: 78%;
}
.slider.slider-wordpress .handle {
    left: 90%;
}
.slider-wrapper h3 {
    margin-top: unset;
    font-size: 1.2rem;
}

/**
Content Style
 */
.content-wrapper {
    background-color: white;
    padding: 100px 80px 100px 80px;
    display: flex;
    justify-content: space-around;
    margin: 40px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.3);
    min-height: 1280px;
    max-width: 900px;
}

/**
Content Style
    General
 */
.icon img {
    width: 30px;
    margin-left:25px;
    filter: drop-shadow(0 2px 2px rgba(86, 86, 86, 0.2));
}

/**
Content Style
    Resume Heading
 */
.resume-heading {
    display: flex;
    flex-direction: column;
    align-items: end;
    text-align: right;

}
h1.resume-name {
    font-size: 4rem;
}
h3.resume-job-position-two {
    margin-top: 3px;
    font-weight: 400;
    text-shadow: none;
}

/**
Content Style
    Resume Personal Info
 */
.resume-personal-info {
    display: flex;
    flex-direction: column;
    align-items: end;
    text-align: right;
    margin-top:50px;

}
.resume-personal-info p {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 300;
    margin: 0px 0px 10px 0px;
}

/**
Content Style
    About Me
 */
.resume-about-me {
    display: flex;
    flex-direction: column;
    align-items: start;

}
.resume-about-me p {
    font-weight: 300;
}

/**
Content Style
    Tools and languages
 */
.tools-group,
.languages-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.tools-group>* {
    flex: 1 1 50px;
}
.tools-group .tool-icon img,
.languages-group .language-icon img {
    width: 50px;
    margin-bottom:1em;
    filter: drop-shadow(0 2px 2px rgba(86, 86, 86, 0.2));
}

/**
Content Style
    Who i am
 */
.resume-who-am-i p {
    font-weight: 300;
}

/**
Content Style
    Experience
 */
.experience-group {}
.experience-group .experience-group-heading p {
    font-size:1.2rem;
}
.experience-sub-group {
    padding-left:25px;
}
.experience-sub-group p {
    font-size: 0.8rem;
}

/**
Content Style
    Education
 */
.education-group p:not(.education-heading) {
    font-size: 0.8rem;
}
</style>
<body>
    <div class="content-wrapper">
    <section class="left-column">
        <div class="resume-heading">
            <h1 class="resume-name">LUCA <br>VISCIOLA</h1>
            <h2 class="resume-job-position-one">Full Stack Developer</h2>
            <h3 class="resume-job-position-two">Technology Consultant</h3>
        </div>
        <hr class="separator keep-right">
        <div class="resume-personal-info mt-2em">
            <p>09 Aprile 1983 <span class="icon"><img src="assets/svg/smile.svg" alt="icon"></span></p>
            <p>Laives (BZ), ITALY <span class="icon"><img src="assets/svg/map.svg" alt="icon"></span></p>
            <p>
                <span class="blurry-out">+39 333.0000000</span>
                <span class="icon"><img src="assets/svg/phone.svg" alt="icon"></span>
            </p>
            <p><a href="mailto:info@melasistema.com">info@melasistema.com</a> <span class="icon"><img src="assets/svg/mail.svg" alt="icon"></span></p>
            <p><a href="https://www.linkedin.com/in/luca-visciola/" target="_blank">luca-visciola</a> <span class="icon"><img src="assets/svg/linkedin.svg" alt="icon"></span></p>
            <p><a href="https://github.com/melasistema" target="_blank">melasistema</a> <span class="icon"><img src="assets/svg/github.svg" alt="icon"></span></p>
        </div>
        <div class="resume-about-me mt-2em">
            <h3 class="">DICONO DI ME</h3>
            <hr  class="separator keep-left">
            <p>Voglioso di cogliere ogni possibilità per migliorare le proprie conoscenze.
                <br>Tanto deciso quanto aperto nella sua visione strategica.
                <br>A suo agio nella gestione di situazioni critiche.</p>
        </div>
        <div class="resume-know-how mt-2em">
            <h3 class="">COMPETENZE</h3>
            <hr  class="separator keep-left">
            <div class="slider-group mt-2em">
                <div class="slider-wrapper">
                    <h3>PHP</h3>
                    <div class="slider slider-php">
                        <div class="track"></div>
                        <div class="handle"></div>
                    </div>
                </div>
                <div class="slider-wrapper">
                    <h3>HTML5</h3>
                    <div class="slider slider-html5">
                        <div class="track"></div>
                        <div class="handle"></div>
                    </div>
                </div>
                <div class="slider-wrapper">
                    <h3>CSS3</h3>
                    <div class="slider slider-css3">
                        <div class="track"></div>
                        <div class="handle"></div>
                    </div>
                </div>
                <div class="slider-wrapper">
                    <h3>JS</h3>
                    <div class="slider slider-js">
                        <div class="track"></div>
                        <div class="handle"></div>
                    </div>
                </div>
                <div class="slider-wrapper">
                    <h3>SHOPWARE</h3>
                    <div class="slider slider-shopware">
                        <div class="track"></div>
                        <div class="handle"></div>
                    </div>
                </div>
                <div class="slider-wrapper">
                    <h3>LARAVEL</h3>
                    <div class="slider slider-laravel">
                        <div class="track"></div>
                        <div class="handle"></div>
                    </div>
                </div>
                <div class="slider-wrapper">
                    <h3>WORDPRESS</h3>
                    <div class="slider slider-wordpress">
                        <div class="track"></div>
                        <div class="handle"></div>
                    </div>
                </div>
            </div>
            <div class="languages-group mt-2em">
                <div class="language-icon">
                    <img src="assets/svg/tools/php.svg" alt="icon">
                </div>
                <div class="language-icon">
                    <img src="assets/svg/tools/mysql.svg" alt="icon">
                </div>
                <div class="language-icon">
                    <img src="assets/svg/tools/html5.svg" alt="icon">
                </div>
                <div class="language-icon">
                    <img src="assets/svg/tools/css-3.svg" alt="icon">
                </div>
                <div class="language-icon">
                    <img src="assets/svg/tools/javascript.svg" alt="icon">
                </div>
            </div>
        </div>
        <div class="resume-tools mt-2em">
            <h3 class="">TOOLS + UTILIZZATI</h3>
            <hr  class="separator keep-left">
            <div class="tools-group">
                <div class="tool-icon">
                    <img src="assets/svg/tools/laravel.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/shopware.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/wordpress.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/symfony.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/vue.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/nodejs.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/jquery.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/sass.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/npm.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/composer.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/phpstorm.svg" alt="icon">
                </div>
                <div class="tool-icon">
                    <img src="assets/svg/tools/git.svg" alt="icon">
                </div>
            </div>
        </div>
    </section>
    <section class="right-column">
        <div class="resume-who-am-i">
            <h3 class="">CHI SONO</h3>
            <hr  class="separator keep-left">
            <p>Full Stack Developer e Technology Consultant con una solida esperienza decennale nel supporto di startups, aziende e agenzie, per guidarle verso il successo e la realizzazione dei loro obiettivi e delle aspettative dei loro clienti.
                Durante il mio percorso, ho affinato le mie competenze e acquisito una profonda comprensione delle dinamiche aziendali, permettendomi di fornire soluzioni tecnologiche innovative e su misura.</p>
        </div>
        <div class="resume-experience mt-2em">
            <h3 class="">ESPERIENZA</h3>
            <hr  class="separator keep-left">
            <div class="experience-group mt-2em">
                <div class="experience-group-heading">
                    <p><b>(2009 - presente)</b>  @ <b><a href="https://melasistema.com" target="_blank">Melasistema</a></b> - Laives (BZ)</p>
                </div>
                <div class="experience-sub-group">
                    <p><b>(2022 - presente)</b> @ <b><a href="https://functionalcompany.com" target="_blank">Functional Srl</a></b> | Bolzano (BZ)</p>
                    <ul>
                        <li>Shopware based platforms developer</li>
                        <li>ERP Connector developer</li>
                        <li>Laravel micro services developer</li>
                        <li>Wordpress developer</li>
                    </ul>
                </div>
                <div class="experience-sub-group">
                    <p><b>(2021 - 2022)</b> @ <b>Aliante Money Srl</b> | Salerno (SA)</p>
                    <ul>
                        <li>API’s Engineering per servizi di comunicazione con istituti bancari</li>
                        <li>Microservices developer per gestionali aziendali e servizi interni</li>
                        <li>Admin dashboard developer per gestione API’s e Microservices</li>
                        <li>Frontend developer multi-role</li>
                        <li>Technology Consultant</li>
                    </ul>
                </div>
                <div class="experience-sub-group">
                    <p><b>(2020 - 2022)</b> @ <b>EOC Srl </b> | Laives (BZ)</p>
                    <ul>
                        <li>Wordpress developer</li>
                        <li>Woocommerce developer</li>
                        <li>Wordpress plugin developer</li>
                        <li>Technology consultant per l’azienda e clienti</li>
                    </ul>
                </div>
                <div class="experience-sub-group">
                    <p><b>(2019 - 2020)</b> @ <b>Goodify Società Benefit </b> | Bolzano (BZ)</p>
                    <ul>
                        <li>Developer’s team coordinator</li>
                        <li>API’s integrator</li>
                        <li>CRM Integrator</li>
                        <li>Marketing Automation integrator</li>
                        <li>Graphics visualizer for print and digital</li>
                    </ul>
                </div>
                <div class="experience-sub-group">
                    <p><b>(2017 - 2019)</b> @ <b>Tooly Tips Srl </b> | Bolzano (BZ)</p>
                    <ul>
                        <li>Backend developer</li>
                        <li>Frontend developer</li>
                        <li>Services and customer panels developer</li>
                        <li>Ticketing System developer</li>
                        <li>Funneling and lead generator system developer</li>
                        <li>API’s integrator</li>
                        <li>Technology Consultant</li>
                    </ul>
                </div>
                <div class="experience-sub-group">
                    <p><b>(2009 - presente)</b> @ <b>Melasistema </b> | Laives (BZ)</p>
                    <ul>
                        <li>Custom web solutions and software developer</li>
                        <li>2D/3D Graphics designer & animator</li>
                        <li>Sound and Video editor</li>
                    </ul>
                </div>
                <div class="experience-group-heading mt-2em">
                    <p><b>(2014 - 2017)</b>  @ <b>Radio NBC</b> - Bolzano (BZ)</p>
                </div>
                <div class="experience-sub-group">
                    <ul>
                        <li>Sincronizzazione flussi radiofonici su piattaforme web</li>
                        <li>Audio/Video Conversion/Publishing system developer</li>
                        <li>Backend developer</li>
                        <li>API’s integrator</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="resume-education mt-2em">
            <h3 class="">EDUCAZIONE</h3>
            <hr  class="separator keep-left">
            <div class="education-group mt-2em">
                <div class="experience-group-heading">
                    <p class="education-heading"><b>(2005) Diploma “Advanced Drummer”</b></p>
                    <p>Drummer Collective di New York (USA)</p>
                    <p class="education-heading"><b>(2003) Diploma superiore “Dirigente di comunità”</b></p>
                    <p>I.I.S artistica e per geometri di Terni (TR)</p>
                </div>
            </div>
        </div>
        <div class="resume-language mt-2em">
            <h3 class="">LINGUE</h3>
            <hr  class="separator keep-left">
            <div class="language-group mt-2em">
                <div class="experience-group-heading">
                    <p>Madrelingua Italiana e ottima conoscenza della lingua inglese</p>
                </div>
            </div>
        </div>
    </section>
</div>
</body>