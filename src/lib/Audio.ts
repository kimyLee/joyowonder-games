const audioArray = [
  'start',
  'click',
  'chek',
  'question01',
  'question02',
  'question03',
  'question04',
  'win',
  'help',
  'common01',
  'common02',
  'common03',
  'common04',
  'common05',
  'error',
  'mat1',
  'mat2',
  'mat3',
  'mat4',
  'mat5',
  'mat6'
]

const audioMap = {} as any
for (let i = audioArray.length; i--; ) {
  audioMap[audioArray[i]] = new Audio(`/joyowonder-games/dist/audio/${audioArray[i]}.mp3`)
}

// 如果发生音效选择事件，则播放对应音效
export function playPreviewMusic(evt: any) {
  if (audioMap[evt]) {
    audioMap[evt].pause()
    audioMap[evt].currentTime = 0
    audioMap[evt].play()
  }
}
