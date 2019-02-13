import { Data, animate, Override, Animatable } from 'framer'

const data = Data({
  // Button
  buttonScale: Animatable(1),

  // Pages
  pageScale: Animatable(1),
  pageLeft: Animatable(-270),
  pageOpacity: Animatable(1),
  pageColor: 'blue',

  // Loading
  loadingScale: Animatable(0),
  loadingTwoScale: Animatable(0),
  loadingTwoOpacity: Animatable(0),

  circleOneScale: Animatable(0),
  circleTwoScale: Animatable(0),
  circleTwoRight: Animatable(59),
  circleThreeRight: Animatable(38),
  circleFourRight: Animatable(19),
  circleFourTop: Animatable(199),
  circleFourScale: Animatable(1),

  // PageNumber
  pageNum: 0,
})

var colors = ['#05668D', '#028090', '#00A896', '#02C39A', '#F0F3BD']

// anim options
const springOptionsOne = {
  tension: 50,
  friction: 10,
}

// Page
export const pageOne: Override = () => {
  return {
    left: data.pageLeft,
    scale: data.pageScale,
    opacity: data.pageOpacity,
    background: data.pageColor,
  }
}

// Loading
export const loadingOne: Override = () => {
  return {
    scale: data.loadingScale,
  }
}
export const loadingTwo: Override = () => {
  return {
    scale: data.loadingTwoScale,
    opacity: data.loadingTwoOpacity,
  }
}
export const circleOne: Override = () => {
  return {
    scale: data.circleOneScale,
    // right: data.circleOneRight,
  }
}
export const circleTwo: Override = () => {
  return {
    scale: data.circleTwoScale,
    right: data.circleTwoRight,
  }
}
export const circleThree: Override = () => {
  return {
    right: data.circleThreeRight,
  }
}
export const circleFour: Override = () => {
  return {
    right: data.circleFourRight,
    top: data.circleFourTop,
    scale: data.circleFourScale,
  }
}

// PageNumber
export const pageNum: Override = () => {
  return {
    pageNum: data.pageNum,
  }
}
const playCircle = async data => {
  await animate.easeInOut(data.circleOneScale, 1).finished

  data.circleOneScale.set(0)
  data.circleTwoScale.set(1)

  await animate.easeInOut(data.circleTwoRight, 57 - 12).finished
  animate.easeInOut(data.circleTwoRight, 57 - 12 - 6 - 1).finished

  await animate.easeInOut(data.circleThreeRight, 38 - 12).finished
  animate.easeInOut(data.circleThreeRight, 38 - 12 - 6).finished

  // last circle
  animate.ease(data.circleFourRight, 19 - 50, {
    duration: 1.5,
  })
  animate.easeIn(data.circleFourTop, 199 + 100, {
    duration: 1.5,
  })
  await animate.easeInOut(data.circleFourScale, 0, {
    duration: 1.5,
  }).finished
}
const initCircle = data => {
  // Init Circles
  data.circleTwoScale.set(0)
  data.circleTwoRight.set(57)
  data.circleThreeRight.set(38)
  data.circleFourRight.set(19)
  data.circleFourTop.set(199)
  data.circleFourScale.set(1)
}

// Button
export const buttonOne: Override = () => {
  return {
    scale: data.buttonScale,
    async onTap() {
      data.buttonScale.set(0.9)
      animate.spring(data.buttonScale, 1)

      // shrink page when loading...
      animate.easeInOut(data.pageScale, 0.98)
      animate.easeInOut(data.pageOpacity, 0.1)

      // reveal loading text
      data.loadingTwoOpacity.set(0.99)
      data.loadingTwoScale.set(3)
      animate.spring(data.loadingTwoScale, 1, springOptionsOne).finished

      for (let index = 0; index < 2; index++) {
        await playCircle(data)
        await initCircle(data)
      }

      // hide loading text
      animate.easeOut(data.loadingTwoOpacity, 0)

      // page reveal
      if (data.pageNum > 0) await animate.easeInOut(data.pageLeft, 380).finished

      data.pageNum++

      data.pageColor = colors[data.pageNum % 5]
      data.pageScale.set(1)
      data.pageOpacity.set(0.99)
      data.pageLeft.set(-270)
      animate.easeInOut(data.pageLeft, 80)
    },
  }
}
