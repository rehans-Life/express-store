const categories = ["headphones", "earbuds", "speakers", "accessories"];

const headphones = [
  {
    id: 1,
    image:
      "images/product-images/headphones/4b0913cf7e65dd88a075f018f6c8a43d0d4c795331043114f4d0573e434c75cb__41966.webp",
    title: "Crusher® ANC 2 Sensory Bass Headphones with Active Noise Canceling",
    category: "Headphones",
    price: 199,
  },
  {
    id: 2,
    image:
      "images/product-images/headphones/4bf0568a00e5ca0cf776b2533d8c8d71cbb6185107a67a3ee57a14b901c2b7c2__49957.webp",
    title:
      "Acid Snow Camo Crusher® ANC 2 Sensory Bass Headphones with Active Noise Canceling",
    category: "Headphones",
    price: 239,
  },
  {
    id: 3,
    image:
      "images/product-images/headphones/7bb25090f641fcece00920079d2ed05b7d1626c5f9386c3eb2963e7b76251611__62798.webp",
    title: "Crusher Evo™ Sensory Bass Headphones with Personal Sound",
    category: "Headphones",
    price: 189,
  },
  {
    id: 4,
    image:
      "images/product-images/headphones/54b31367756de9da6f67f4ff6a1f6684663b1fbc5e01c3938bb96843f7667a3e__46542.webp",
    title: "Hesh® ANC Noise Canceling Wireless Headphones",
    category: "Headphones",
    price: 129,
  },
  {
    id: 5,
    image:
      "images/product-images/headphones/70bef8d752eb3c08660603ad5fff5e404e410d043ef4341d253fdb0f482de9de__52216.jpg",
    title: "Hesh® Evo Wireless Headphones",
    category: "Headphones",
    price: 69,
  },
  {
    id: 6,
    image:
      "images/product-images/headphones/621a3757c15f664620469e0472d9c43a9fa8b5522f2be778e5de7f3deb3b180f__17766.jpg",
    title: "Riff® Wireless 2 On-Ear Headphones",
    category: "Headphones",
    price: 59,
  },
  {
    id: 7,
    image:
      "images/product-images/headphones/38868011814a0821f1d372ccdacc8cda173bb747c601869774193a49dc608b08__10227.jpg",
    title: "Cassette® Wireless On-Ear Headphones",
    category: "Headphones",
    price: 34,
  },
  {
    id: 8,
    image:
      "images/product-images/headphones/a2d2c58261f7d93da862439f127c51c7bc2317bf62fac795e7ae17b34be4809f__76895.jpg",
    title: "PLYR® Multi-Platform Wireless Gaming Headset",
    category: "Headphones",
    price: 139,
  },
  {
    id: 9,
    image:
      "images/product-images/headphones/a7d2d0a4138857d261fb3ed903dae13fbc02d6d8ed9e0adfe32606aa59ba5894__56095.jpg",
    title: "TMNT PLYR® Multi-Platform Wireless Gaming Headset",
    category: "Headphones",
    price: 149,
  },
  {
    id: 10,
    image:
      "images/product-images/headphones/70bef8d752eb3c08660603ad5fff5e404e410d043ef4341d253fdb0f482de9de__52216.jpg",
    title: "Doritos SLYR® Multi-Platform Wired Gaming Headset",
    category: "Headphones",
    price: 47,
  },
];

const earbuds = [
  {
    id: 1,
    image:
      "images/product-images/earbuds/0a3738e4c0de2ec1c1723fa2eb1a12952e880103e26a495f44042a84d23e78d7__17857.webp",
    title: "Rail® ANC True Wireless Earbuds",
    category: "Earbuds",
    price: 119,
  },
  {
    id: 2,
    image:
      "images/product-images/earbuds/1a3aac7fa8c821cbb605b86ce36e141cc4591c8125129eca4fafcfc257676664__34352.jpg",
    title: "Grind® Fuel True Wireless Earbuds",
    category: "Earbuds",
    price: 99,
  },
  {
    id: 3,
    image:
      "images/product-images/earbuds/3a5d41ab31658e0343cdf4aff37b70ac5b1a89fc3a62d43a2bb1b8742c562509__43992.jpg",
    title: "Inkd+ Earbuds with Microphone",
    category: "Earbuds",
    price: 14,
  },
  {
    id: 4,
    image:
      "images/product-images/earbuds/32d9ea7f71e098af0fdccc05cc8cf97715594d461e8f74771a7eb77765bda972__35735.webp",
    title: "Push® Active True Wireless Earbuds",
    category: "Earbuds",
    price: 79,
  },
  {
    id: 5,
    image:
      "images/product-images/earbuds/45e20e502c9c9b21d89a38f740610ae6229a47294a42ba157623d9f0f48122e8__37283.webp",
    title: "Sesh® ANC True Wireless Earbuds",
    category: "Earbuds",
    price: 89,
  },
  {
    id: 6,
    image:
      "images/product-images/earbuds/49fe5c2e0d679a30440bcf5250b96684b228376c9b8b097d92701d4badc60047__03670.webp",
    title: "Mod® True Wireless Earbuds",
    category: "Earbuds",
    price: 39,
  },
  {
    id: 7,
    image:
      "images/product-images/earbuds/5841a6e9721c8cdf1db877aba778757360c46145542224df95a07369926fe724__62109.webp",
    title: "Jib™ True 2 Wireless Earbuds",
    category: "Earbuds",
    price: 69,
  },
  {
    id: 8,
    image:
      "images/product-images/earbuds/6653506f104ebbb7d0a7553df2d797444f11625b10f1ef69dea3395fea7b4e9f__46833.webp",
    title: "Dime® 3 True Wireless Earbuds",
    category: "Earbuds",
    price: 59,
  },
  {
    id: 9,
    image:
      "images/product-images/earbuds/ccab5cccefb8ddb6e3dab7781b7039f523513ec6f45fa119628acc52c7db956c__78798.webp",
    title: "Acid Snow Camo Dime® 3 True Wireless Earbuds",
    category: "Earbuds",
    price: 49,
  },
  {
    id: 10,
    image:
      "images/product-images/earbuds/cdda5382c1ccc6c692724af68c212b7a6a1353e63192f5ebaa8cc586e1568e00__09063.jpg",
    title: "Smokin Buds® True Wireless Earbuds",
    category: "Earbuds",
    price: 29,
  },
];

const speakers = [
  {
    id: 1,
    image:
      "images/product-images/speakers/2f244ee1b0d4e24ec5fff7fa41f3af837209d34b95540b662c6d345d7b8fd931__97257.webp",
    title: "Terrain™ XL Wireless Bluetooth® Speaker",
    category: "Speakers",
    price: 79,
  },
  {
    id: 2,
    image:
      "images/product-images/speakers/11acc9230960d588a1877d2021a011c93ed6a12fcf599db42e82360d3ab5915c__48573.webp",
    title: "Terrain™ Wireless Bluetooth® Speaker",
    category: "Speakers",
    price: 59,
  },
  {
    id: 3,
    image:
      "images/product-images/speakers/5561f9d527219b07aa7c95b879333e369161c157c146b07d70d914162228e583__06797.webp",
    title: " Terrain™ Mini Wireless Bluetooth® Speaker",
    category: "Speakers",
    price: 39,
  },
  {
    id: 4,
    image:
      "images/product-images/speakers/115655a82c1e0fea2816c1a066d403a7df750a9287fe5c98665a2b318407703e__47617.webp",
    title: "Kilo™ Wireless Bluetooth® Speaker",
    category: "Speakers",
    price: 35,
  },
  {
    id: 5,
    image:
      "images/product-images/speakers/298317ac74db423a5df24a37b92e5a01c1af6e22f49a4018865d323c3d1bfdd4__07304.webp",
    title: "Barrel™ Wireless Bluetooth® Speaker",
    category: "Speakers",
    price: 249,
  },
  {
    id: 6,
    image:
      "images/product-images/speakers/dc9ec53febc4a5f63ba2460c0ab8f4e11248f47c7d25069598254e6ec30e693d__47762.webp",
    title: "Ounce™ Wireless Bluetooth® Speaker",
    category: "Speakers",
    price: 29,
  },
  {
    id: 7,
    image:
      "images/product-images/speakers/ddbf9b792fe0b0b330cbc249e88725083f9a8d2d47997db06c71c048d13365fa__85113.webp",
    title: "Acid Snow Camo Kilo™ Wireless Bluetooth® Speaker",
    category: "Speakers",
    price: 49,
  },
];

const accessories = [
  {
    id: 1,
    image:
      "images/product-images/accessories/2b75f3a095319196b082379d1996b578afe03a0784f6216dceb90fb6e489b044__49555.jpg",
    title: "Line+ Braided Charging Cable",
    category: "Accessories",
    price: 19,
  },
  {
    id: 2,
    image:
      "images/product-images/accessories/9d672463786730977555ede8932d7119b938efd5639b7529ff76bce811791ae3__22053.webp",
    title: "Ultra Low Latency Wireless Transmitter for PLYR®",
    category: "Accessories",
    price: 29,
  },
];

const productTypes = {
  headphones,
  earbuds,
  accessories,
  speakers,
};

const productBundles = {
  "New Arrivals": headphones,
  "Exclusive Products": speakers,
  "Recommended Products": earbuds,
};
