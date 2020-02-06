const btnStart   = document.getElementById ('btnStart')
const green     = document.getElementById('green')
const cyan      = document.getElementById('cyan')
const yellow    = document.getElementById('yellow')
const magenta   = document.getElementById('magenta')
const last_level = 2

class Game {
    constructor(){
        this.initialize()
        this.generate_sequency()
        setTimeout( this.next_level(), 500 )
    }
    
    initialize (){
        //btnStart.classList.add('hide')
        //btnStart.style.display = 'none'
        this.level = 1
        this.toggle_Btn_start ()
        this.colors = {green, cyan, yellow, magenta}
    }

    toggle_Btn_start (){
        if (btnStart.style.display == 'none'){
            btnStart.style.display = 'inline'
        } else {
            btnStart.style.display = 'none'
        }
    }
    generate_sequency(){
        //this.sequency = new Array(10).fill(0).map( n => Math.floor(Math.random() * 4))
        this.sequency = Array.from({length: last_level}, () => Math.floor(Math.random() * 4));
    }

    next_level(){
        this.sublevel = 0
        this.light_sequency()
        this.add_click_event()
    }

    transform_number_color(number){
        switch (number){
            case 0:
                return 'cyan'
            case 1:
                return 'magenta'
            case 2:
                return 'green'
            case 3:
                return 'yellow'
        }
    }

    transform_color_number(color){
        switch (color){
            case 'cyan':
                return 0
            case 'magenta':
                return 1
            case 'green':
                return 2
            case 'yellow':
                return 3
        }
    }

    light_color(color){
        this.colors[color].classList.add('light')
        setTimeout( () => { this.colors[color].classList.remove('light')} , 550)
    }
    
    light_sequency (){
        for (let i = 0; i< this.level ; i++){
            const color = this.transform_number_color(this.sequency[i])
            setTimeout(() => this.light_color (color) , 1400*i)
        }
    }

    add_click_event(){
        //this.colors = {green, cyan, yellow, magenta}
        this.colors.green.addEventListener  ('click', this.choose_color.bind(this))
        this.colors.cyan.addEventListener   ('click', this.choose_color.bind(this))
        this.colors.magenta.addEventListener('click', this.choose_color.bind(this))
        this.colors.yellow.addEventListener ('click', this.choose_color.bind(this))
    }

    delete_click_event(){
        //this.colors = {green, cyan, yellow, magenta}
        this.colors.green.removeEventListener  ('click', this.choose_color.bind(this))
        this.colors.cyan.removeEventListener   ('click', this.choose_color.bind(this))
        this.colors.magenta.removeEventListener('click', this.choose_color.bind(this))
        this.colors.yellow.removeEventListener ('click', this.choose_color.bind(this))
    }

    choose_color(ev){
        //console.log(ev.target.id)
        //console.log(ev)
        
        //<div id="yellow"     class="color verde right"   data-color="yellow" data-my_name = "This is my name"></div>
        // I can pass through <div> information 
        //console.log(ev.target.dataset.color)
        // ev.target.dataset comes from the HTML
        //console.log(ev.target.dataset.my_name) //only yellow has this attribute 
        
        const name_color = ev.target.dataset.color
        const number_color =  this.transform_color_number(name_color)
        this.light_color(name_color)
        //console.log (number_color)

        if(number_color === this.sequency[this.sublevel]){
            this.sublevel ++
            if (this.sublevel === this.level){
                this.level ++
                this.delete_click_event()
                if (this.level === (last_level+1)){
                    this.win_the_game ()
                } else {
                    setTimeout(this.next_level.bind(this), 1000)
                }
            }
        } else {
            this.lost_the_game ()
        }
    }

    win_the_game (){
        swal('Simon Says', 'you win', 'success')
        .then(this.initialize.bind(this))
    }

    lost_the_game (){
        swal('Simon Says', 'you lose', 'error')
        .then(()=>{
            this.delete_click_event()
            this.initialize()
        })
    }
}

function start_game(){
    //alert("The game will start")
    //var game = new Game ()
    window.game = new Game ()
}

