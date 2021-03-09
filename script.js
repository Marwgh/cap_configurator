"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach(option => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;


  // TODO: Toggle feature in "model"
  
  if (features[feature]) {
    features[feature] = false ;  
  } else {
    features[feature]  = true ;
  }
  // If feature is (now) turned on: g
  // - mark target as chosen (add class "chosen") g
  // - un-hide the feature-layer(s) in the #product-preview; g
  // - create featureElement and append to #selected ul
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

    
  // Else - if the feature (became) turned off:
  // - no longer mark target as chosen
  // - hide the feature-layer(s) in the #product-preview
  // - find the existing featureElement in #selected ul
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM
  
  if (features[feature]) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);
    target.classList.add("chosen");
    document.querySelector(`[data-feature=${feature}]`).classList.remove("hide");
    let feat = createFeatureElement(feature);
    document.querySelector("#selected ul").appendChild(feat); 
    const start = document.querySelector(`#options > [data-feature=${feature}]`).getBoundingClientRect();
    const end  = document.querySelector(`#selected ul [data-feature=${feature}]`).getBoundingClientRect();

    const diffX =  start.x - end.x  ;
    const diffY =  start.y - end.y  ;

    document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffY", diffY);
    document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffX", diffX);
  


    document.querySelector(`#selected ul [data-feature=${feature}]`).classList.add("animate-feature-in");
    console.log(end);
    

    // TODO: More code

  } else {
    // feature removed
    console.log(`Feature ${feature} is turned off!`);
    document.querySelector(`[data-feature=${feature}]`).classList.add("hide");
    target.classList.remove("chosen");
    const start = document.querySelector(`#options > [data-feature=${feature}]`).getBoundingClientRect();
    const end  = document.querySelector(`#selected ul [data-feature=${feature}]`).getBoundingClientRect();

    const diffX =  start.x - end.x  ;
    const diffY =  start.y - end.y  ;

    document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffY", diffY);
    document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffX", diffX);
  


    document.querySelector(`#selected ul [data-feature=${feature}]`).classList.add("animate-feature-out");
    document.querySelector(`#selected ul [data-feature=${feature}]`).addEventListener("animationend" ,() =>{
      dell(feature);
    })
  
    
    // TODO: More code 
  }

}

function dell (feature) {
  document.querySelector(`#selected ul [data-feature=${feature}]`).remove()
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);
  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}