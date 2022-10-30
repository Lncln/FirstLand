'use strict'

let completedProjects = [
    {
        imageUrl: "Images/Section2/admiralinterior.svg",
        city: `Rostov-on-Don<br>LCD admiral`,
        repairTime: `3.5 months`,
        apartmentArea: `81 m<sup>2</sup>`,
        repairCosr: `Upon request`
    },
    {
        imageUrl: "Images/Section2/sochithieves.svg",
        city: `Sochi<br>Thieves`,
        repairTime: `4 months`,
        apartmentArea: `105 m<sup>2</sup>`,
        repairCosr: `Upon request`
    },
    {
        imageUrl: "Images/Section2/rostovpatriotic.svg",
        city: `Rostov-on-Don<br>Patriotic`,
        repairTime: `3 months`,
        apartmentArea: `95 m<sup>2</sup>`,
        repairCosr: `Upon request`
    }
];



let projectImage = document.querySelector('.admiral-img');
let sliderArrows = document.querySelectorAll('.arrow');
let projectInfoWrap = document.querySelector('.project-info-wrap');
let projectPoints = document.querySelectorAll('.radiopoint');
let projectNavigation = document.querySelector('.project-link');
let projects = projectNavigation.querySelectorAll('li');

initArrows()
initPoints()
initLink()

projectImage.setAttribute('data-index', 0);

function initArrows() {
    for (let arrow of sliderArrows) {
        arrow.addEventListener('click', function() {
            let curNumber = +projectImage.dataset.index;
            let nextNumber;
            if (arrow.classList.contains("left")) {
                nextNumber = curNumber === 0? completedProjects.length - 1 : curNumber - 1;

                +projectImage.dataset.index <= 0? projectImage.dataset.index = completedProjects.length - 1 : projectImage.dataset.index--;


            } else {
                nextNumber = curNumber === completedProjects.length - 1? 0 : curNumber + 1;

                +projectImage.dataset.index >= completedProjects.length - 1? projectImage.dataset.index = 0 : projectImage.dataset.index++;


                // надо сократить КОД
            }
            moveSlider(nextNumber);
        })
    }
}

function initPoints() {
    for (let point of projectPoints) {
        point.addEventListener('click', () => {
                let nextnumber = +point.value - 1
                projectImage.dataset.index = point.value - 1;
                moveSlider(nextnumber)
        })
    };
};

function initLink() {
    projects.forEach((project, index) => {
        project.addEventListener('click', () => {
            let nextNumber = index
            moveSlider(nextNumber);
        });
    })
};

function moveSlider(num) {
    changeProjectInfo(num);
    changeProjectImage(num);
    changePoint(num);
    changeActiveProject(num);
};

function changePoint(n) {
    for (let point of projectPoints) {
        if (point.value - 1 == n) {
            if (!point.hasAttribute('checked')){
                point.setAttribute('checked', true)
            } else {
                point.checked = true;
            }
        };
    };
};

function changeProjectImage(n) {
    projectImage.src = completedProjects[n].imageUrl;
};

function changeProjectInfo(n) {
    let arr = [];
    arr.push(completedProjects[n].city, completedProjects[n].repairTime, completedProjects[n].apartmentArea, completedProjects[n].repairCosr);
    let i = 0;
    for (let projectInfo of projectInfoWrap.querySelectorAll('div')) {
        projectInfo.querySelector('span').innerHTML = arr[i++]
    }
};

function changeActiveProject(n) {
    for (let project of projects) {
    project.querySelector('a').classList.remove('active-project-link');
    };
    projects[n].querySelector('a').classList.add('active-project-link');
};



