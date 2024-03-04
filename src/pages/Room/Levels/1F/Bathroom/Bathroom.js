import './Bathroom.css';

const BATHROOM = {
  room: 'bathroom',
  backgroundImage: 'src/assets/images/pictures/1F/BATHROOM-POINTED.png',
  items: [
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/console.gif',
      itemPosition: { x: '456px', y: '466px' },
      itemSound: 'src/assets/audio/sounds/rooms/tv-switching.mp3',
      colliderSize: { w: '173px', h: '140px' },
      colliderPosition: { x: '456px', y: '466px' },
      size: '175px',
      hiddenOnPrint: true,
      disappearOnClick: true,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/ticket.png',
      itemPosition: { x: '1469px', y: '552px' },
      itemSound: 'src/assets/audio/sounds/rooms/metal-drag.mp3',
      colliderSize: { w: '45px', h: '30px' },
      colliderPosition: { x: '1492px', y: '558px' },
      size: '70px',
      hiddenOnPrint: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/door.png',
      itemPosition: { x: '1180px', y: '636px' },
      itemSound: 'src/assets/audio/sounds/rooms/door-creaks.mp3',
      colliderSize: { w: '70px', h: '150px' },
      colliderPosition: { x: '1280px', y: '656px' },
      size: '174px',
      hiddenOnPrint: true,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/necessaire.png',
      itemPosition: { x: '1724px', y: '876px' },
      itemSound: 'src/assets/audio/sounds/rooms/toolbox.mp3',
      colliderSize: { w: '107px', h: '40px' },
      colliderPosition: { x: '1724px', y: '890px' },
      size: '107px',
      hiddenOnPrint: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/bottle.png',
      itemPosition: { x: '1273px', y: '526px' },
      itemSound: 'src/assets/audio/sounds/rooms/drag-bottle.mp3',
      colliderSize: { w: '35px', h: '55px' },
      colliderPosition: { x: '1273px', y: '526px' },
      size: '43px',
      hiddenOnPrint: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/candle.png',
      itemPosition: { x: '615px', y: '388px' },
      itemSound: 'src/assets/audio/sounds/rooms/drag-bottle.mp3',
      colliderSize: { w: '20px', h: '65px' },
      colliderPosition: { x: '621px', y: '393px' },
      size: '31px',
      hiddenOnPrint: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/jar.png',
      itemPosition: { x: '480px', y: '698px' },
      itemSound: 'src/assets/audio/sounds/rooms/toolbox.mp3',
      colliderSize: { w: '50px', h: '65px' },
      colliderPosition: { x: '480px', y: '700px' },
      size: '54px',
      hiddenOnPrint: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/hatch.png',
      itemPosition: { x: '218px', y: '460px' },
      itemSound: 'src/assets/audio/sounds/rooms/sliding-wood.mp3',
      colliderSize: { w: '73px', h: '65px' },
      colliderPosition: { x: '218px', y: '490px' },
      size: '73px',
      hiddenOnPrint: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/switch.png',
      itemPosition: { x: '860px', y: '460px' },
      itemSound: 'src/assets/audio/sounds/rooms/sliding-wood.mp3',
      colliderSize: { w: '16px', h: '65px' },
      colliderPosition: { x: '860px', y: '460px' },
      size: '16px',
      hiddenOnPrint: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/basket.png',
      itemPosition: { x: '213px', y: '773px' },
      itemSound: 'src/assets/audio/sounds/rooms/searching.mp3',
      colliderSize: { w: '45px', h: '40px' },
      colliderPosition: { x: '233px', y: '773px' },
      size: '71px',
      hiddenOnPrint: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/paint.png',
      itemPosition: { x: '1072px', y: '350px' },
      itemSound: 'src/assets/audio/sounds/rooms/paint.mp3',
      colliderSize: { w: '54px', h: '75px' },
      colliderPosition: { x: '1084px', y: '370px' },
      size: '74px',
      hiddenOnPrint: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/picture.png',
      itemPosition: { x: '1603px', y: '373px' },
      itemSound: 'src/assets/audio/sounds/rooms/paint.mp3',
      colliderSize: { w: '26px', h: '37px' },
      colliderPosition: { x: '1603px', y: '373px' },
      size: '26px',
      hiddenOnPrint: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/note.png',
      itemPosition: { x: '948px', y: '304px' },
      itemSound: 'src/assets/audio/sounds/rooms/story-note.mp3',
      colliderSize: { w: '26px', h: '37px' },
      colliderPosition: { x: '988px', y: '319px' },
      size: '50px',
      hiddenOnPrint: false,
      disappearOnClick: true,
    },
  ],
};

export default BATHROOM;