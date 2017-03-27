(function(){
const oneLiners = [
      "fresh squeezed content",
      "more cowbell",
      "limit one per household",
      "while supplies last",
      "'objectively'",
      "Gaben's favorite website",
      "dance the night away",
      "just add water",
      "these boots were made for inclusive design",
      "come on in the water's fine",
      "gluten free",
      "one size fits all",
      "now with less sodium",
      "take twice a day with coffee",
      "please read responsibly",
      "organically grown",
      "greetings from down under",
      "Bill and Ted's bogus bug solution",
      "omit that last message, this is the real message",
      "praise the sun!",
      "Coming Soon: less bugs",
      "leave your shoes at the door",
      "keeping keyboards clean since 1995",

      "now with: <em>Codervision &#8482</em>"
    ];
    const oneLiner = function(IdName){
      let oneLiner = document.getElementById(IdName);
      let seed = Math.floor(Math.random() * oneLiners.length);
      oneLiner.innerHTML = oneLiners[seed];
    };
    (function(){
      window.addEventListener("load", function(){
        oneLiner("oneLiner");
      });
    }());
    // (function(){
    //   console.log(window.innerHeight);
    //   window.addEventListener("scroll",function(){
    //     let distance = window.scrollY;
    //   })
    // }());
    // window.scrollTo(0,500);
    (function(){
      let $contactBtn = document.getElementById("cnt");
      let $contactPage = document.getElementById("Contact");
      let $faders = document.getElementById("faders");

      $contactBtn.addEventListener("click", function(e){
            e.preventDefault();
            console.log($contactPage)
            fadeCurrentShowNext($faders,$contactPage);





            // for(let i = 0; i < fadersObjects.length;i++ ){
            //     let prevClasses = fadersObjects[i].getAttribute("class");
            //     fadersObjects[i].addEventListener("animationend", function(){
            //         fadersObjects[i].setAttribute("class", prevClasses + " hidden")
            //     })
            //     fadersObjects[i].setAttribute("class", prevClasses + " slide-down");
            // }
            // $contactPage.setAttribute("class","content medium-12 large-9 columns");
        });
    }());
    //takes old selection, applies fade to child elements, but doesn't apply to items already hidden. on animation end removes classes and sets to just hidden
    //takes 'nextSelector' and adds fades down, after sets classes 
    const fadeCurrentShowNext = function(pastSelector, nextSelector) {
        let pastObj = pastSelector.children;
        for(let i = 0; i < pastObj.length; i++) {
                let prevClasses = pastObj[i].getAttribute('class');
                if(prevClasses.includes("hidden") === false) {
                    console.log('should be 7 of these');
                    pastObj[i].addEventListener("animationend", function(){
                        pastObj[i].setAttribute("class", prevClasses + " hidden")
                    });
            }
            pastObj[i].setAttribute("class", prevClasses + " slide-down");
        }
        nextSelector.setAttribute("class","content small-12 columns");
    }
}());