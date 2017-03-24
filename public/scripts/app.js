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
      let $faders = document.getElementById("faders");
      let prevClasses = $contactBtn.getAttribute("class");
      let fadersObjects = $faders.children;

      $contactBtn.addEventListener("click", function(e){
            e.preventDefault();
            console.log(fadersObjects.length);
            for(let i = 0; i < fadersObjects.length;i++ ){
                let prevClasses = fadersObjects[i].getAttribute("class");
                fadersObjects[i].addEventListener("animationend", function(){
                    fadersObjects[i].setAttribute("class", prevClasses + " slide-down-end")
                })
                fadersObjects[i].setAttribute("class", prevClasses + " slide-down");
            }
            // $contactBtn.setAttribute("class", prevClasses + " slide-down");
        });
        // $contactBtn.addEventListener("animationend", function(){
            // $contactBtn.setAttribute("class", prevClasses);
        // });
    }());