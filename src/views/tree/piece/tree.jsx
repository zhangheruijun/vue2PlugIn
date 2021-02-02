import '../../../assets/tree/tree.less'
export default {
	data() {
		return {rec: [],listArr:[]}
	},
	props: {
		data: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	mounted() {
    const initData = JSON.parse(JSON.stringify(this.data)); //数据转化
		const rec = this.initRecursion(initData,null)
		this.rec = rec
		// console.log(rec);
	},
	methods: {
		//递归循环dom
		init(arr) {
			// icon： 为空时无icon；为 open 时icon向下；为 close 时为向右
			// 选中框： 为空时无选中；为 checked 时为选中；为 half 时半选中
			return (
				<ul class="tree">
					{arr.map((item) => (
						<li class={`tree-item ${item.opened}`}>
							<div class="tree-title">
								<div class={`folder ${item.opened}`} onClick={() => {this.onReceiveFair(item)}}>
									<img class="open-img" src={`${require("../../../assets/tree/icon.png")}`} alt="暂时无法显示此图" />
								</div>
								<div class={`tree-check ${item.checked}`}  onClick={()=>{this.onChecked(item)}}>
									<div class="check-select">
                    <img class="check-img" src={`${require("../../../assets/tree/pitch.png")}`} alt="暂时无法显示此图" />
                  </div>
								</div>
								<div class="item">{item.title}</div>
							</div>
							{item.children && this.init(item.children)}
						</li>
					))}
				</ul>
			)
    },
    //展开与收起
    onReceiveFair(item){
      if (item.opened == 'open') {
        item.opened = 'close'
        this.init(this.rec)
        return
      }
      if (item.opened == 'close') {
        item.opened = 'open'
        this.init(this.rec)
        return
      }
    },
    //点击选中/非选中状态
    onChecked(item){
      if(item.checked==''){
        item.checked = 'checked'
      }else{
        item.checked = ''
      }
      this.listArr = []
      this.$nextTick(()=>{
        this.monitoringFor(this.rec)
      })
      //循环找到顶层父级的选中与非选中状态
      this.adjustParent(item)
      // this.init(this.rec)
    },
		//父级元素的选中与否
		getCheckedFun(itemParent){
			const checkAll = itemParent.children.every(item=>item.checked == 'checked');  //全部选中
			const unSelectAll = itemParent.children.every(item=>item.checked == '');  //全部没选中
			if(checkAll){
				return 'checked'
			}else if(unSelectAll){
				return ''
			}else{
				return 'half'
			}
		},
		//父父级的选中与子元素的选中
		adjustParent(adjust){
			//调整父级
			let parent = adjust.parent
			while(parent){
				parent.checked = this.getCheckedFun(parent)
				parent = parent.parent
			}
			//调整子集
			if(adjust?.children?.length>0){
				this.adjust(adjust.children,adjust.checked)
			}
		},
		//子集循环
		adjust(arr,checked){
			arr.forEach(element=>{
				element.checked = checked;
				if(element?.children?.length>0){
					this.adjust(element.children,checked)
				}
			})
		},
		//递归数据
		initRecursion(data,parent) {
			return data.map(item => {
        item.checked = '';  //默认全部没选中
				item.parent = parent;
				if (!item.children || item.children.length == 0) {
					item.opened = '';
				} else {
					item.opened = 'close';
					item.children = this.initRecursion(item.children,item)
				}
				return item
			})
    },
    //循环检测选中的标签
    monitoringFor(rec){
      rec.forEach((item=>{
        if(item.checked == 'checked'||item.checked == 'half'){
          if(item?.children?.length>0){
            this.monitoringFor(item.children)
          }else{
            this.listArr.push(item.title)
          }
        }
      }))
    },
  },
	render() {
		return (
			<div>
				{this.init(this.rec)}
        <div>选中的标签：{this.listArr.join('----')}</div>
			</div>
		)
	}
}
