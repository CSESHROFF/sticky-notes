const addbtn = document.querySelector('#addbtn');
const main = document.querySelector('main')



// save note function
const saveNotes = ()=>{
    const notes = document.querySelectorAll(".note textarea");
    const data=[];
    notes.forEach(
        (note)=>{
            data.push(note.value);
        }
    )

    // store in localstorage
    if(data.length===0){
        localStorage.removeItem(notes)
    }else{
        localStorage.setItem("notes",JSON.stringify(data))
    }
   
}


addbtn.addEventListener(
    "click", () => {
        addNote();
    }
)



// create div
{/* <div class="note">
            <div class="tool"><i class="fa-solid fa-delete-left">
                </i>
                <i class="fa-regular fa-floppy-disk"></i>
            </div>
            <textarea></textarea>

        </div> */}
const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
            <div class="tool "><i class="fa-solid fa-delete-left trash">
                </i>
                <i class="fa-regular fa-floppy-disk save"></i>
            </div>
            <textarea>${text}</textarea>
    `;

    // remove notes
    note.querySelector(".trash").addEventListener("click",()=>{
        note.remove()
        saveNotes()
    })

    // save note

    note.querySelector(".save").addEventListener("click",()=>{
        saveNotes();
    })
    note.querySelector("textarea").addEventListener('focusout',()=>{
        saveNotes();
    })
    main.appendChild(note);
    saveNotes();



}

(
    function(){
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if(lsNotes===null){
            addNote()
        }else{
            lsNotes.forEach(
                (lsNotes)=>{
                    addNote(lsNotes)
                }
            )
        }
       
      
    }

)()