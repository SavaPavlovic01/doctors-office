import { Router } from "@angular/router"
import { User } from "./user"
import IntervalManager from "./intervalManager"

class timeoutManager{
    private static instance:timeoutManager

    private static alert_active:boolean=false
    private static max_inactive:number=20*60*1000
    private static curUser:User=null
    private static router:Router
    private static im:IntervalManager
    public static time_left:number

    public static updateLocal(){
        let temp=this.curUser.last_active
        let tempUser:User=JSON.parse(localStorage.getItem('user'))
        tempUser.last_active=temp
        localStorage.setItem('user',JSON.stringify(tempUser))
    }

    public static clear_listeners(){
        document.removeAllListeners('mousedown');
        document.removeAllListeners('mousemove')
        document.removeAllListeners('keydown')
        document.removeAllListeners('scroll')
        document.removeAllListeners('touchstart')    
    }

    private static event(){
        //console.log('event')
        timeoutManager.curUser.last_active=Date.now();
        timeoutManager.updateLocal()
        if(this.alert_active) {document.getElementById('close_modal').click();this.alert_active=false;}
    }

    public static add_listeners(){
        document.addEventListener('mousedown',(ev)=>{
          timeoutManager.event()
        })
    
        document.addEventListener('mousemove',(ev)=>{
            timeoutManager.event()
        })
    
        document.addEventListener('keydown',(ev)=>{
            timeoutManager.event()
        })
    
        document.addEventListener('scroll',(ev)=>{
            timeoutManager.event()
        })
    
        document.addEventListener('touchstart',(ev)=>{
            timeoutManager.event()
          
        })
    
        document.addEventListener('scroll',(ev)=>{
            timeoutManager.event()
        })
    }

    private constructor(){

    }

    public static getInstance(rou:Router){
        if(!this.instance){
            this.instance=new timeoutManager()
        }
        this.curUser=JSON.parse(localStorage.getItem('user'))
        this.im=IntervalManager.getInstance()
        this.router=rou
        return this.instance
    }

    public static logoutOnInit(){
        if(Date.now()-timeoutManager.curUser.last_active>timeoutManager.max_inactive) {
            localStorage.clear();
            timeoutManager.router.navigate([''])
        }
    }

    public static setInterval(){
        timeoutManager.im.clearAllIntervals();
        timeoutManager.im=IntervalManager.getInstance()
        timeoutManager.im.setInterval(()=>{
            //console.log(Date.now()-this.curUser.last_active)
            if(Date.now()-this.curUser.last_active>this.max_inactive/2){
                //console.log(this.alert_active)
                if(!this.alert_active){document.getElementById('toggle_modal').click(); this.alert_active=true;}
                this.time_left=Math.floor((this.max_inactive-Date.now()+this.curUser.last_active)/1000)
        
            }
            if(Date.now()-this.curUser.last_active>this.max_inactive) {
                localStorage.clear();
                this.im.clearAllIntervals()
                document.getElementById('close_modal').click()
                this.clear_listeners()
                this.router.navigate([''])
            }
        },1000)
    }
}

export default timeoutManager