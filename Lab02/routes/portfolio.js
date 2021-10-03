const express = require("express");
const router = express.Router();

const portfolioData = [
  {
    index: 1,
    title: "Puppy Thumbs",
    breifDescription: "Ever wonder if man's best friend could get any better?",
    image: "1.png",
    modalDescription:
      "Surely the addition of opposable thumbs would make a game of fetch more interesting if nothing else. These 3D printed pouch appendages are bound to entertain and get you some strange looks as you take Fido for a stroll if nothing else.",
    modalSales: "10 Million Units Sold!",
    modalRating: "-5/10",
  },
  {
    index: 2,
    title: "Air Stick",
    breifDescription: "Forever losing your Apple Airpods?",
    image: "2.png",
    modalDescription:
      'Forever losing your Apple Airpods? Or simply worried that you might misplace them? Also a fiend for oriental food and wolfing down a good meal with some chopsticks? Then the Airsticks might be the perfect solution for you. "The perfect accessory for your Apple AirPods. Enjoy your favourite sushi on the go and never leave your chopsticks behind.',
    modalSales: "10 Units Sold!",
    modalRating: "-100/10",
  },
  {
    index: 3,
    title: "The Pillow One S",
    breifDescription: "Breif Description",
    image: "3.png",
    modalDescription:
      "If you've blown plenty of money on the latest flagship smartphone then you no doubt want to look after it and keep it in great shape. Why not treat it to its own bed? This new invention, known as the Pillow One S is \"A bed in a box for your smartphone...Your phone works just as hard as you do, it deserves a good night charge.",
    modalSales: "Never Manufactured",
    modalRating: "0/0",
  },
  {
    index: 4,
    title: "The Finglonger",
    breifDescription: "Breif Description",
    image: "4.png",
    modalDescription:
      'The Finglonger is a new device inspired by the cartoon classic Futurama. In the show, Professor Farnsworth jealously shows off the Fing-Longer - an elegantly simple finger extender invented by someone else. Perfect for handing out mission briefings or reaching new distances with ease. "Reach new heights like never before! Extend your abilities on any finger to finally reach what you simply never could before.',
    modalSales: "878542 Units Sold, (and returned by customer)!",
    modalRating: "1/1",
  },
  {
    index: 5,
    title: "The Front2Back Case",
    breifDescription: "Breif Description",
    image: "5.png",
    modalDescription:
      "Daydreaming about folding phones? Or just think that phone camera technology isn't quite exciting enough? How about two phones, in the same case, so you can snap a selfie and a forward-facing photo at the same time. Plus you'll always have two mobiles with you, so if one runs out of battery you don't even need to worry about recharging. \"Quit only getting photos of your friends when you know you are looking good! The Front2Back Case combines two iPhone cases that perfect expose the cameras in each direction, so you can always have your second spare iPhone with you. Selfie away.",
    modalSales: "Modal Sales",
    modalRating: "Modal Rating",
  },
  {
    index: 6,
    title: "The Inferno Knuckles",
    breifDescription: "Breif Description",
    image: "6.png",
    modalDescription:
      "If home defence is always at the forefront of your mind, but you're worried about fumbling in the dark for a light switch when you hear someone breaking in, then this might be the solution. The Inferno Knuckles is a knuckle duster and candlestick holder combo that lights your way and acts as a brilliant defensive tool too. ",
    modalSales: "Modal Sales",
    modalRating: "Modal Rating",
  },
  {
    index: 7,
    title: "The Hoverbrella",
    breifDescription: "Breif Description",
    image: "7.png",
    modalDescription:
      "There's no denying that drones are becoming more and more popular. With the recent news that companies like Amazon and Google are getting into drones for commercial use, we're only bound to see more and more in the skies above us in the years to come. Sure, drones have many uses, but Matt Benedetto has certainly dreamt up a thoroughly British one here. A hands-free umbrella solution that does all the work for you. The Hoverbrella is designed to allow users to \"Enjoy a rainy day without the hassle of having to carry an umbrella. Go hands-free and stay completely dry as it follows you around wherever you need to go!",
    modalSales: "Modal Sales",
    modalRating: "Modal Rating",
  },
  {
    index: 8,
    title: "Verified Burst Your Bubble Belt Buckle",
    breifDescription: "Breif Description",
    image: "8.png",
    modalDescription:
      "Who doesn't enjoy the thrill of popping bubble wrap? Such a satisfying thing to do. But sometimes you just can't do it fast enough. Well, good news, with this unnecessary invention you can pop multiple air bubbles at once, all from a convenient belt buckle too. ",
    modalSales: "Modal Sales",
    modalRating: "Modal Rating",
  },
  {
    index: 9,
    title: "Avocado On A Stick",
    breifDescription: "Breif Description",
    image: "9.png",
    modalDescription:
      "Do you have an unhealthy obsession with avocado but a loathing for how much hassle they can be to cut up and spread neatly on your toast? Worry no more as the new product - Avocado On A Stick is here to ease your woes. We'd imagine it doesn't help with how quickly the avocado ripens and goes off though, so better get spreading fast. \"Now make your favourite snack faster than ever at home or on the go...on a stick!",
    modalSales: "Modal Sales",
    modalRating: "Modal Rating",
  },
  {
    index: 10,
    title: "SunShaders",
    breifDescription: "Breif Description",
    image: "10.png",
    modalDescription:
      'Are your usual sunglasses letting in too much light or not giving you quite enough privacy? Are you looking to start a new fashion trend? Then SunShaders might be the product for you - stylish blinds for your sunglasses. "Get more of your sunglasses with your own shades for your shades. Whether you need to block out more light, spy through the blinds, or block out haters - wear them up, down, or closed with your favourite pair of sunglasses.',
    modalSales: "Modal Sales",
    modalRating: "Modal Rating",
  },
];

// GET '/portfolio'
router.get("/", async (req, res) => {
  res.status(200).render("portfolio", {
    portfolioData,
  });
});

module.exports = router;
