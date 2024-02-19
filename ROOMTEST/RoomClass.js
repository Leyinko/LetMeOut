import Audio, { playSound } from '../src/components/atoms/audio/Audio';

class Stage {
  constructor(roomJSON) {
    this.roomJSON = roomJSON;
  }

  stages = {
    first: 40,
    second: 70,
    third: 100,
  };

  // TICKET

  printRoom() {
    let background = document.createElement('img');
    background.src = this.roomJSON.backgroundImage;
    background.className = 'background';

    let room = document.querySelector('#room');
    room.appendChild(background);

    this.roomJSON.items.forEach((item, index) => {
      let object = document.createElement('img');
      object.src = item.itemImage;

      object.style.position = 'absolute';
      object.style.transition = 'all 1s ease-in';
      object.style.top = item.itemPosition.y;
      object.style.left = item.itemPosition.x;
      object.style.width = item.size;

      let collider = document.createElement('div');
      collider.style.position = 'absolute';
      collider.style.top = item.colliderPosition.y;
      collider.style.left = item.colliderPosition.x;
      collider.style.width = item.colliderSize.w;
      collider.style.height = item.colliderSize.h;

      collider.id = index;

      room.appendChild(collider);
      room.appendChild(object);

      collider.addEventListener('click', () => {
        let sound = Audio(item.itemSound);
        playSound(sound);

        object.style.transform = item.transform;
        item.disappearOnClick && object.remove();
      });
    });
  }
}

export default Stage;

export const R1 = {
  backgroundImage: 'src/assets/images/pictures/1F/BATHROOM-POINTED.png',
  items: [
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/producto-lavabo.png',
      itemPosition: { x: '1469px', y: '552px' },
      itemSound: 'src/assets/audio/sounds/rooms/metal-drag.mp3',
      colliderSize: { w: '45px', h: '30px' },
      colliderPosition: { x: '1492px', y: '558px' },
      size: '70px',
      transform: 'translateX(-30px)',
      appearOnClick: false,
      disappearOnClick: false,
    },
    // COMODE box-shadow, appearance skewY
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/comode.png',
      itemPosition: { x: '1180px', y: '636px' },
      itemSound: 'src/assets/audio/sounds/rooms/door-creaks.mp3',
      colliderSize: { w: '70px', h: '150px' },
      colliderPosition: { x: '1280px', y: '656px' },
      size: '174px',
      transform: '',
      appearOnClick: true,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/bolsa-lavabo.png',
      itemPosition: { x: '1724px', y: '876px' },
      itemSound: 'src/assets/audio/sounds/rooms/toolbox.mp3',
      colliderSize: { w: '107px', h: '40px' },
      colliderPosition: { x: '1724px', y: '890px' },
      size: '107px',
      transform: 'translate(40px, 90px) rotate(17deg)',
      appearOnClick: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/botella.png',
      itemPosition: { x: '1273px', y: '526px' },
      itemSound: 'src/assets/audio/sounds/rooms/drag-bottle.mp3',
      colliderSize: { w: '35px', h: '55px' },
      colliderPosition: { x: '1273px', y: '526px' },
      size: '43px',
      transform: 'translateX(25px)',
      appearOnClick: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/candle.png',
      itemPosition: { x: '615px', y: '388px' },
      itemSound: 'src/assets/audio/sounds/rooms/drag-bottle.mp3',
      colliderSize: { w: '20px', h: '65px' },
      colliderPosition: { x: '621px', y: '393px' },
      size: '31px',
      transform: 'translateX(20px)',
      appearOnClick: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/down-tv.png',
      itemPosition: { x: '480px', y: '698px' },
      itemSound: 'src/assets/audio/sounds/rooms/toolbox.mp3',
      colliderSize: { w: '50px', h: '65px' },
      colliderPosition: { x: '480px', y: '700px' },
      size: '54px',
      transform: 'translate(-80px, 180px)',
      appearOnClick: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/hidden-closet.png',
      itemPosition: { x: '218px', y: '460px' },
      itemSound: 'src/assets/audio/sounds/rooms/sliding-wood.mp3',
      colliderSize: { w: '73px', h: '65px' },
      colliderPosition: { x: '218px', y: '490px' },
      size: '73px',
      transform: 'translate(5px, 70px)',
      appearOnClick: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/interruptor.png',
      itemPosition: { x: '860px', y: '460px' },
      itemSound: 'src/assets/audio/sounds/rooms/sliding-wood.mp3',
      colliderSize: { w: '16px', h: '65px' },
      colliderPosition: { x: '860px', y: '460px' },
      size: '16px',
      transform: 'rotate(13deg) scale(0.95) translate(-5px, 0px)',
      appearOnClick: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/left-basket.png',
      itemPosition: { x: '213px', y: '773px' },
      itemSound: 'src/assets/audio/sounds/rooms/searching.mp3',
      colliderSize: { w: '45px', h: '40px' },
      colliderPosition: { x: '233px', y: '773px' },
      size: '71px',
      transform: 'translateY(170px)',
      appearOnClick: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/paint-wall.png',
      itemPosition: { x: '1072px', y: '350px' },
      itemSound: 'src/assets/audio/sounds/rooms/paint.mp3',
      colliderSize: { w: '54px', h: '75px' },
      colliderPosition: { x: '1084px', y: '370px' },
      size: '74px',
      transform: 'rotate(20deg)',
      appearOnClick: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/wall-picture.png',
      itemPosition: { x: '1603px', y: '373px' },
      itemSound: 'src/assets/audio/sounds/rooms/paint.mp3',
      colliderSize: { w: '26px', h: '37px' },
      colliderPosition: { x: '1603px', y: '373px' },
      size: '26px',
      transform: 'translateX(25px)',
      appearOnClick: false,
      disappearOnClick: false,
    },
    {
      itemImage: 'src/assets/images/pictures/1F/pointers/secret-note-1.png',
      itemPosition: { x: '948px', y: '304px' },
      itemSound: 'src/assets/audio/sounds/rooms/story-note.mp3',
      colliderSize: { w: '26px', h: '37px' },
      colliderPosition: { x: '988px', y: '319px' },
      size: '50px',
      transform: '',
      appearOnClick: false,
      disappearOnClick: true,
    },
  ],
};
