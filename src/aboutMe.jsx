import React , {useState} from "react";

const AboutMe = ()=>{
    const [isOpen , setIsOpen] = useState(false);
    return(
        <div className="w-full  shadow-lg bg-blue-100">
            <div className="max-w-5xl mb-10  mx-auto items-center p-10 flex-wrap border-red-600">
                <div><img src="office.jpg" alt="office image" 
                className="w-28 h-28 md:w-48 md:h-48 mx-auto my-5 rounded-full"/></div>
                <div >
                    <h1 className="text-2xl mt-3 font-bold md:text-4xl text-indigo-800">Hello EveryOne... <span>🖐</span></h1>
                    <h3 className="text-xl md:text-3xl mt-5 text-slate-950 font-bold">I'm Atif</h3>

                    <p className=" mt-4 text-gray-700 md:text-lg tracking-wide justify-center ">"Your future starts here. We're not just an educational institute; we are a career launchpad. With industry-expert faculty and a curriculum focused on in-demand skills, we transform motivated students into job-ready professionals, guaranteed to excel in a competitive market."</p>
                    <button className="px-8 py-3 rounded-xl text-white mt-8 shadow-lg bg-red-500 hover:bg-red-600">Go back</button>
                    </div>
            </div>
                    <p className="p-4 text-center text-xl font-bold bg-slate-950 text-white">Computer Related Courses Are Avaliable Here.</p>
        </div>
    )
}
export default AboutMe;