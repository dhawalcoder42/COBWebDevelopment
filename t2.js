const paragraphs = [
    "She had a habit of taking showers in lemonade It took me too long to realize that the ceiling hadn't been painted to look like the sky nEveryone was curious about the large white blimp that appeared overnight Jason didn’t understand why his parents wouldn’t let him sell his little sister at the garage sale I'd rather be a bird than a fish Green should have smelled more tranquil, but somehow it just tasted rotten. He spiked his hair green to support his iguana.They throw cabbage that turns your brain into emotional baggage.She could hear him in the shower singing with a joy she hoped he'd retain after she delivered the news.The estate agent quickly marked out his territory on the dance floor",
    "The rain pelted the windshield as the darkness engulfed us.He decided water-skiing on a frozen lake wasn't a good idea. She works two jobs to make ends meet; at least, that was her reason for not having time to join us.She did not cheat on the test, for it was not the right thing to do.Iron pyrite is the most foolish of all minerals.As she walked along the street and looked in the gutter, she realized facemasks had become the new cigarette butts. As time wore on, simple dog commands turned into full paragraphs explaining why the dog couldn’t do something.The llama couldn't resist trying the lemonade.It was the scarcity that fueled his creativity.",
    "The clouds formed beautiful animals in the sky that eventually created a tornado to wreak havoc.A dead duck doesn't fly backward.The delicious aroma from the kitchen was ruined by cigarette smoke Bill ran from the giraffe toward the dolphin. I always dreamed about being stranded on a desert island until it actually happened.She was too short to see over the fence.  When she didn’t like a guy who was trying to pick her up, she started using sign language.She learned that water bottles are no longer just to hold liquid, but they're also status symbols. Shingle color was not something the couple had ever talked about.",
    "Love is not like pizza.The worst thing about being at the top of the career ladder is that there's a long way to fall. I'm not a party animal, but I do like animal parties. Separation anxiety is what happens when you can't find your phone. The best key lime pie is still up for debate.He didn’t want to go to the dentist, yet he went anyway.Excitement replaced fear until the final moment.If eating three-egg omelets causes weight-gain, budgie eggs are a good substitute.One small action would change her life, but whether it would be for better or for worse was yet to be determined.Sixty-Four comes asking for bread.There's a growing trend among teenagers of using frisbees as go-cart wheels.",
    "They desperately needed another drummer since the current one only knew how to play bongos.She always had an interesting perspective on why the world must be flat.Her scream silenced the rowdy teenagers.Lets all be unique together until we realise we are all the same.I'm worried by the fact that my daughter looks to the local carpet seller as a role model .The quick brown fox jumps over the lazy dog.Facing his greatest fear, he ate his first marshmallow.There can never be too many cherries on an ice cream sundae.Be careful with that butter knife.He quietly entered the museum as the super bowl started.Weather is not trivial - it's especially important when you're standing in it.",
    "Most big Japanese firms depend on exports.It's not going to be a problem.I've never seen a whale that big.There are many new recipes.She got Taco Bell for lunch to try to cheer herself up, but it only made her more upset.I could hang out with her.When she was little, she hated cheese so much that she even pulled it off her pizza. She hated the color pink, even though she had loved it as a child.I will have a baby in the near future.On the other hand, I feel like I just have to do it for my sanity.My grandmother's death was a big shock.He lives on this street.",    
    "the professor put on the pirate hat.She sells Christmas trees.He needed thirteen stitches.I am filthy rich.He had an old pickup truck and a big, battered mower. Let's go to the mall today!If you could buy anything you wanted, what would you buy?I saw some cool vintage chairs in a thrift store, but I really need to stop buying things.A broadband jam is a network of the mind. One cannot separate chickens from glowing periods. A production is a faucet from the right perspective. The lines could be said to resemble zincoid females. A deborah is a tractor's whale. Cod are elite japans. Some posit the wiglike norwegian to be less than plashy. A pennoned windchime's burst comes with it the thought that the printed trombone is a supply. Relations are restless tests."];
    
    const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".time span b"),
    errorTag = document.querySelector(".error span"), // Updated variable name to match the class name
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = error = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    error--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                error++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - error) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        errorTag.innerText = error; 
        cpmTag.innerText = charIndex - error;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - error) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = error = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    errorTag.innerText = 0; 
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);