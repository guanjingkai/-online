Component({

  behaviors: [],

  properties: {
    myProperty: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (newVal, oldVal) { } // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
    },
    myProperty2: String,
    mTop: String,
    mLeft: String,
    petId:String
  },
  data: {
    imageUrl:'',
    petImage: '',
    petWidth: '',
    petHeight: '',
    pTop: '',
    pLeft: '',
    sTime: '',
    cTime: '',
    positions:[],
    fpsType:0,
    fpsNo:0
  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    console.log(this.properties.mTop);
    if (this.properties.petId == 'wa_keshui'){
      //this.data.petImage = '../../../assets/img/pet/wa/' + this.properties.petId+'.png';
      this.setData({
        imageUrl: '../../../assets/img/pet/wa/' + this.properties.petId,
        petWidth:'130rpx',
        petHeight:'140rpx',
        pTop: '26.6%',
        pLeft: '60%',
        sTime:2000,
        cTime:100,
        positions: [0,1,2]
      })
    } else if (this.properties.petId == 'wa_jichou') {
      this.setData({
        imageUrl: '../../../assets/img/pet/wa/' + this.properties.petId,
        petWidth: '116rpx',
        petHeight: '96rpx',
        pTop: 'calc(21% - 48rpx)',
        pLeft: 'calc(37% - 58rpx)',
        sTime: 1600,
        cTime: 200,
        positions: [0, 1, 2, 3, 4, 5,6]
      })
    } else if (this.properties.petId == 'wa_kanshu') {
      this.setData({
        imageUrl: '../../../assets/img/pet/wa/' + this.properties.petId,
        petWidth: '108rpx',
        petHeight: '104rpx',
        pTop: 'calc(20% - 52rpx)',
        pLeft: 'calc(65% - 54rpx)',
        sTime: 3000,
        cTime: 100,
        positions: [0, 1, 2, 3, 4, 5]
      })
    } else if (this.properties.petId == 'wa_zhuang') {
      this.setData({
        imageUrl: '../../../assets/img/pet/wa/' + this.properties.petId,
        petWidth: '252rpx',
        petHeight: '154rpx',
        pTop: 'calc(77% - 126rpx)',
        pLeft: 'calc(40% - 77rpx)',
        sTime: 900,
        cTime: 100,
        positions: [0, 1, 2, 3, 4]
      })
    } else if (this.properties.petId == 'wa_xiao') {
      this.setData({
        imageUrl: '../../../assets/img/pet/wa/' + this.properties.petId,
        petWidth: '165rpx',
        petHeight: '123rpx',
        pTop: 'calc(65% - 82rpx)',
        pLeft: 'calc(68% - 62rpx)',
        sTime: 500,
        cTime: 50,
        positions: [0, 1, 2, 3]
      })
    }else{

    }
    this.petShow();
  },
  moved: function () { },
  detached: function () { },

  methods: {
    petShow(){
      console.log('petShow');
      this.setData({
        fpsNo: 0,
        fpsType: 0
      })
      this.petPlay();
      setTimeout(function () {
        this.petShow()
      }.bind(this), this.data.sTime)
    },
    petPlay() {
      if (this.data.fpsNo >= 0){
        if(this.data.fpsType == 0){
          this.setData({
            petImage: this.data.imageUrl + '_' + this.data.fpsNo+'.png',
            fpsNo: this.data.fpsNo + 1
          })
          if (this.data.fpsNo == this.data.positions.length){
            this.setData({
              fpsType: 1,
              fpsNo: this.data.fpsNo - 1
            })
          }
        }else{
          this.setData({
            petImage: this.data.imageUrl + '_' + this.data.fpsNo + '.png',
            fpsNo: this.data.fpsNo - 1
          })
          
        }
        setTimeout(function () {
          this.petPlay()
        }.bind(this), this.data.cTime)
      }
    },
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    _myPrivateMethod: function () {
      // 内部方法建议以下划线开头
      this.replaceDataOnPath(['A', 0, 'B'], 'myPrivateData') // 这里将 data.A[0].B 设为 'myPrivateData'
      this.applyDataUpdates()
    },
    _propertyChange: function (newVal, oldVal) {

    }
  }

})