class split{
    constructor(data,arr){
        var splitted_data = []
        this.arr  =arr
        this.data = data
        this.splitted_data  = splitted_data
    }

    spliting(){
        var temp
        var i = 0
        try{
        for (i in this.arr){
            var t1;
            t1 = this.arr[i];
            temp = this.data.product.map((item) => ( item[t1] ));
            this.splitted_data.push(temp);
            return this.splitted_data

        }}catch(e){
            console.log('here')
        }
        
        }

}
module.exports = split;