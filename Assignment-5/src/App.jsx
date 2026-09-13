import { useState } from 'react';
import { useEffect } from 'react';

function App(){
  const [technologies,setTechnologies]=useState([]);
  const [selectedStack,setSelectedStack]=useState([]);

  useEffect(()=>{
    const fetchTechnologies=async()=>{
      const res=await fetch('/technologies.json');
      const data=await res.json();
      setTechnologies(data);
    };
    fetchTechnologies();
  },[]);


  const handleAddToStack=(tech)=>{
  if (selectedStack.includes(tech)) return;
  const newStack=[...selectedStack]; 
  newStack.push(tech); 
  setSelectedStack(newStack); 
};

  //zei item select kora hobe seta remove kora
  const handleRemoveSingle=(id)=>{
  const updated=selectedStack.filter((item)=>{
    return item.id!==id;
  });

  setSelectedStack(updated);
  };

  //sobgula item eki sathe remove kora
  const handleRemoveAll=()=>{
    setSelectedStack([]);
  };

  return(
    <section className="max-w-screen mx-auto px-[60px] py-[58px]">

      <div className="mb-[24px]">
        <h2 className="text-[35px] font-extrabold text-gray-900">
          Explore the <span className="text-pink-500">Technologies</span>
        </h2>
        <p className="text-gray-400 text-[16px]">
          Pick one technology per category to build your ideal stack.
        </p>
      </div>





      <div className="flex gap-8">

        <div className="grid grid-cols-3 gap-6">
            
          {technologies.map((tech)=>{
            const isSelected=Boolean(selectedStack.find((item)=>item.id===tech.id));
            return(
              <div
                key={tech.id}
                className={`p-6 rounded-2xl bg-white border-2 flex flex-col justify-between ${
                  isSelected ? "border-pink-500 shadow-md" : "border-gray-100"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <img src={tech.icon} alt={tech.name} className="w-9 h-9"/>
                    {tech.badge && (
                      <span className="text-[11px] px-[10px] py-1 rounded-full bg-blue-50 text-blue-600 font-semibold">
                        {tech.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">{tech.name}</h3>
                  <p className="text-xs text-gray-400 mt-2">
                    {tech.description}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2 text-[12px] text-gray-400 mb-4">
                    <span className="bg-gray-100 px-[10px] py-1 rounded text-gray-600">{tech.category}</span>
                    <span className="bg-gray-100 px-[10px] py-1 rounded text-gray-600">{tech.difficulty}</span>
                    <span className="ml-auto font-bold text-amber-500">★ {tech.rating}</span>
                  </div>

                  <button onClick={()=>handleAddToStack(tech)} disabled={isSelected}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition ${
                      isSelected ? "bg-gray-200 text-gray-400" : "bg-black text-white" }`}>
                    {isSelected ? "Added to Stack" : "Add to Stack"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>


        <div className="min-w-[250px]">
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800">Your Stack</h3>
            <p className="text-xs text-gray-400 mb-4">
              {selectedStack.length} Technology Selected
            </p>

            {selectedStack.length===0?(
              <div className="border-2 border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
                Your stack is empty.
              </div>
            ):(
              <div className="space-y-3 mb-6">
                {selectedStack.map((item)=>(
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <img src={item.icon} alt={item.name} className="w-7 h-7"/>
                      <div>
                        <h4 className="font-bold text-xs text-gray-800">{item.name}</h4>
                        <p className="text-[10px] text-gray-400">{item.category}</p>
                      </div>
                    </div>
                    <button onClick={()=>handleRemoveSingle(item.id)} className="text-gray-400 px-[8px]">
                      ✗
                    </button>
                  </div>
                ))}
              </div>
            )}

            {selectedStack.length>0 && (
              <button
                onClick={handleRemoveAll}
                className="w-full py-[10px] border border-red-200 text-red-500 rounded-[8px] text-[16px]">
                Remove All
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;