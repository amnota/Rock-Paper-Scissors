const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')
const navLink = document.querySelectorAll('.nav_link')
const contactFrom = document.getElementById('contact-form')
const contactMessage = document.getElementById('contact-message')
const sections = document.querySelectorAll('section[id]')
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')
const getCurrentTheme = () => document.body.classList.contains(darkTheme)? 'dark' : 'light'
const getCurrentIcon = () => document.classList.contains(iconTheme)? 'ri-moon-line' : 'ri-sun-line'

/*=============== ROCK PAPER SCISSORS  =============== */
const gameContainer = document.querySelector(".game_container");
const userResult = document.querySelector(".user-result");
const cpuResult = document.querySelector(".cpu-result");
const result = document.querySelector(".result");
const options = document.querySelector(".options");
const optionIcon = document.querySelectorAll(".option-icon"); 

/*=============== SHOW/HIDE MENU ===============*/
if(navToggle){
    navToggle.addEventListener('click' , ()=> {
        navMenu.classList.add('show-menu')
    })
}
if(navClose) {
    navClose.addEventListener('click' ,()=> {
        navMenu.classList.remove('show-menu')
    })
}
/*=============== REMOVE MENU ===============*/
const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50? header.classList.add('shadow-header')
                      : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)
/*=============== EMAIL JS ===============*/
const sendEmail = (e) =>{
    e.preventDefault()
    emailjs.sendForm('service_mv7c5yt', 'template_qw54wbn', '#contact-form', '6UiJKUBBFVAMpvs4w')
    .then( () => {
        contactMessage.textContent = 'Message sent successfully ✅'
        setTimeout( ()=> {
            contactMessage.textContent = ''
        }, 5000)
        contactFrom.reset()
    } ,() => {
        contactMessage.textContent = 'Message not sent (service error) ❌'
    })
}
contactFrom.addEventListener('submit' , sendEmail)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350? scrollUp.classList.add('show-scroll')
                       : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll' , scrollUp)
/*=============== ACTIVE LINK ===============*/
const scrollActive = () => {
    const scrollDown = window.scrollY
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58, 
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav_menu a[href*=' + sectionId + ']')
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }
        else{
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/ 
if(selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}
themeButton.addEventListener('click', () =>{
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme' , getCurrentTheme())
    localStorage.setItem('selected-theme' , getCurrentIcon())
})
/*=============== ROCK PAPER SCISSORS =============== */
optionIcon.forEach((icon, index)=>{
    icon.addEventListener("click" , (e)=>{
        icon.classList.add("active");

        optionIcon.forEach((icon2, index2) =>{
            icon.addEventListener("click" , ()=>{
                if(index !== index2){
                    icon2.classList.remove("active");
                }
            })
        })
        gameContainer.classList.add("start");

        let time = setTimeout(()=>{
            gameContainer.classList.remove("start");

         
            let iconClass = e.target.querySelector("i").className;
            userResult.innerHTML = `<i class="${iconClass}" style="color: #E37383; "></i>`;

            let randomNumber = Math.floor(Math.random() * 3);
        
            let cpuIcon = ["fa-regular fa-hand-back-fist", "fa-regular fa-hand-paper", "fa-regular fa-hand-scissors"];
            cpuResult.innerHTML = `<i class="${cpuIcon[randomNumber]}" style="color: #E37383; "></i>`;

        
            let userValue = ["R" , "P" ,"S"][index];
            let cpuValue = ["R" , "P" , "S"][randomNumber];
        
            let outcome = {
                RR : "Draw" , 
                RP : "CPU" , 
                RS : "User"  ,
                PP : "Draw" , 
                PR : "User" ,
                PS : "CPU"  ,
                SS : "Draw" ,
                SR : "CPU"  ,
                SP : "User"   
            }
            let outcomeValue = outcome[userValue + cpuValue];
            result.textContent = userValue === cpuValue ? "Match Draw!" : `${outcomeValue} Won!`;

        }, 2500)
    })
})