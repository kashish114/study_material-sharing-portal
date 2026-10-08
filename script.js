/* ==============================
   STUDYSHARE MATERIAL DATA
================================ */

const saved =
    JSON.parse(
        localStorage.getItem("studyshare_materials")
    ) || null;


const materials =
    saved || [

        {
            title: "DBMS Unit 1 Notes",
            type: "Notes",
            subject: "B.Tech • Semester 5",
            desc:
                "Database concepts, ER model and relational model."
        },

        {
            title: "Web Technology Question Paper",
            type: "Question Paper",
            subject: "B.Tech • Semester 5",
            desc:
                "Previous year university examination paper."
        },

        {
            title: "Java Programming Assignment",
            type: "Assignment",
            subject: "B.Tech • Semester 5",
            desc:
                "Classes, objects, inheritance and exception handling."
        },

        {
            title: "Computer Networks Notes",
            type: "Notes",
            subject: "B.Tech • Semester 5",
            desc:
                "Networking models, protocols and network devices."
        },

        {
            title: "Operating Systems E-book",
            type: "E-book",
            subject: "B.Tech • Semester 5",
            desc:
                "Processes, memory management and file systems."
        },

        {
            title: "Software Engineering Paper",
            type: "Question Paper",
            subject: "B.Tech • Semester 5",
            desc:
                "Previous examination paper for practice."
        }

    ];


/* ==============================
   DISPLAY MATERIALS
================================ */

function render() {

    const searchInput =
        document.getElementById("search");

    const filterInput =
        document.getElementById("filter");


    const q =
        searchInput.value.toLowerCase();


    const f =
        filterInput.value;


    const list =
        materials.filter(item => {

            const matchesType =
                f === "all" ||
                item.type === f;


            const text =
                (
                    item.title +
                    item.subject +
                    item.desc
                ).toLowerCase();


            const matchesSearch =
                text.includes(q);


            return matchesType &&
                   matchesSearch;

        });


    const grid =
        document.getElementById("grid");


    grid.innerHTML =
        list.map((item, index) => {

            return `

                <article class="card">

                    <span class="tag">
                        ${item.type}
                    </span>

                    <h3>
                        ${item.title}
                    </h3>

                    <div class="meta">

                        ${item.subject}

                        <br>

                        ${item.desc}

                    </div>

                    <div class="card-foot">

                        <span class="muted">
                            PDF • ${index + 2} pages
                        </span>

                        <button
                            class="download"
                            onclick="downloadMaterial('${item.title}')">

                            Download

                        </button>

                    </div>

                </article>

            `;

        }).join("");


    if (list.length === 0) {

        grid.innerHTML =
            `
            <p class="muted">
                No materials found.
            </p>
            `;

    }

}


/* ==============================
   DOWNLOAD
================================ */

function downloadMaterial(title) {

    toast(
        "Demo download started for " +
        title
    );

}


/* ==============================
   SUBMIT MATERIAL
================================ */

function submitMaterial() {

    const title =
        document
            .getElementById("title")
            .value
            .trim();


    const file =
        document
            .getElementById("file")
            .files[0];


    if (!title) {

        toast(
            "Please enter a material title."
        );

        return;
    }


    if (!file) {

        toast(
            "Please select a study file."
        );

        return;
    }


    const newMaterial = {

        title: title,

        type:
            document
                .getElementById("type")
                .value,

        subject:
            document
                .getElementById("subject")
                .value ||
            "Student submission",

        desc:
            document
                .getElementById("desc")
                .value ||
            "Submitted study material.",

        fileName:
            file.name

    };


    materials.unshift(
        newMaterial
    );


    localStorage.setItem(
        "studyshare_materials",
        JSON.stringify(materials)
    );


    render();


    document.getElementById("title").value =
        "";

    document.getElementById("subject").value =
        "";

    document.getElementById("desc").value =
        "";

    document.getElementById("file").value =
        "";


    toast(
        "Material saved for admin review!"
    );


    go("materials");

}


/* ==============================
   LOGIN
================================ */

function openLogin() {

    document
        .getElementById("loginModal")
        .style.display = "grid";

}


function closeLogin() {

    document
        .getElementById("loginModal")
        .style.display = "none";

}


function login() {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    if (!email) {

        toast(
            "Enter your email address."
        );

        return;

    }


    closeLogin();


    toast(
        "Demo login successful for " +
        email
    );

}


/* ==============================
   TOAST MESSAGE
================================ */

function toast(message) {

    const element =
        document.getElementById("toast");


    element.textContent =
        message;


    element.style.display =
        "block";


    setTimeout(() => {

        element.style.display =
            "none";

    }, 2400);

}


/* ==============================
   PAGE NAVIGATION
================================ */

function go(id) {

    document
        .getElementById(id)
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==============================
   INITIAL LOAD
================================ */

render();