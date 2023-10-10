class recommendation{
    constructor(user_pref,prev,cart,product){
        var fb = [];
        var fc = [];
        var ft = [];
        var buy_range = [];
        this.user_pref = user_pref
        this.prev = prev
        this.cart = cart
        this.product = product
        this.fb = fb
        this.fc = fc
        this.ft = ft
        this.buy_range = buy_range
    }
    recom(){
        var recon = []
        var i,temp,ctemp
        if(Object.keys(this.user_pref).length==0){
            for(i=0;i<this.product[0].length;i++){
                recon.push([0,this.product[5][i]])
            }
            return recon
        }else{
            this.get_Buy_Range(this.prev,this.cart)
            this.pre_prev(this.prev)
            this.pre_cart(this.cart)
            i = 0
            //checking if pref stuff not in computed then add
            for(i in this.user_pref.brand){
                if (this.ispresent(this.fb,this.user_pref.brand[i])==false){
                    this.fb.push(this.user_pref.brand[i])
                }
            }
            for(i in this.user_pref.type){
                if (this.ispresent(this.ft,this.user_pref.type[i])==false){
                    this.ft.push(this.user_pref.type[i])
                }
            }

            
            for(i in this.user_pref.colors){
                if (this.ispresent(this.fc,this.user_pref.colors[i])==false){
                    this.fc.push(this.user_pref.colors[i])
                }
            }
            var gen_product = this.product[4]
            var brand_product = this.product[0]
            var cat_product = this.product[2]
            var color_product = this.product[1]
            var prices_product = this.product[3]
            var id_product = this.product[5]
            // console.log(id_product)
            for(var k=0;k<this.product[0].length;k++){
                var match = 0
                if(gen_product[k].toString().toLowerCase()==this.user_pref.gender.toString().toLowerCase() || gen_product[k].toString().toLowerCase()=='unisex'){
                    
                    if (this.ispresent(this.fb,brand_product[k])){
                       
                        match+=1
                    }
                    if(this.ispresent(this.ft,cat_product[k])){
                        match+=1
                    }
                    

                    for(ctemp in color_product[k]){
                        if(this.ispresent(this.fc,color_product[k][ctemp])){
                            match+=1
                            break
                        }
                    }

                    // if(this.ispresent(this.fc,color_product[k])){
                    //     match+=1
                    // }
                    if(this.inRange(prices_product[k])){
                        match+=1
                    }
                    // console.log(id_product[k].toString())
                    recon.push([match,id_product[k]])
                }
                else{
                    recon.push([0,id_product[k]])
                }
            }
        }
        this.bsort(recon)
        return recon
    }
    get_Buy_Range(prev,cart){
        var n,Q25,Q75,prices
        prices = []
        for(var i in prev[4]){
            if(prev[3][i]==this.user_pref.gender ){
                prices.push(prev[4][i])
            }
        }
        for(var i in cart[4]){
            if(cart[3][i]==this.user_pref.gender){
                prices.push(cart[4][i])
            }
        }
        n = prices.length
        prices.sort()
        Q25 = 0.25*(n+1)
        Q75 = 0.75*(n+1)
        Q25 = Math.floor(Q25)
        Q75 = Math.floor(Q75)
        this.buy_range.push(prices[Q25])
        this.buy_range.push(prices[Q75])
    }//done
    inRange(x){
        if(x>=this.buy_range[0] && x<=this.buy_range[1]){
            return true
        }
        return false
    }
    mostFrequent(arr){
        var n
        n = arr.length
        // Insert all elements in hash.
        var hash = new Map();
        for (var i = 0; i < n; i++)
        {
            if(hash.has(arr[i]))
                hash.set(arr[i], hash.get(arr[i])+1)
            else
                hash.set(arr[i], 1)
        }

        // find the max frequency
        var max_count = 0, res = -1;
        hash.forEach((value,key) => {

            if (max_count < value) {
                res = key;
                max_count = value;
            }

        });

        return res;
    }//done
    ispresent(arr,x){
        var r
        r = arr.length
        for(var i=0;i<r;i++){
            if(arr[i].toLowerCase()==x.toString().toLowerCase()){
                return true
            }
        }
        return false
    }
    pre_prev(prev) {
        var brands, colors, cat,gen;
        brands = []
        cat = []
        colors = []
        gen = prev[3]
        for (var i=0;i<prev.length;i++){
            if(gen[i]==this.user_pref.gender){
                brands.push(prev[0][i])
                cat.push(prev[1][i])
                colors.push(prev[2][i])
            
            }
        }
        
        this.fb.push(this.mostFrequent(brands))
        this.ft.push(this.mostFrequent(cat))
        this.fc.push(this.mostFrequent(colors))
    }//done
    pre_cart(prev) {
        var brands, colors, cat,gen;
        brands = []
        cat = []
        colors = []
        gen = prev[3]
        for (var i=0;i<prev.length;i++){
            if(gen[i]==this.user_pref.gender){
                brands.push(prev[0][i])
                cat.push(prev[1][i])
                colors.push(prev[2][i])
            }
        }
        this.fb.push(this.mostFrequent(brands))
        this.ft.push(this.mostFrequent(cat))
        this.fc.push(this.mostFrequent(colors))
    }//done
    bsort(arr)
    {
    var i, j, temp,n;
    n = arr.length
    var swapped;
    for (i = 0; i < n - 1; i++)
    {
        swapped = false;
        for (j = 0; j < n - i - 1; j++)
        {
            if (arr[j][0] < arr[j + 1][0])
            {
        
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
 
        // IF no two elements were
        // swapped by inner loop, then break
        if (swapped == false)
        break;
    }
}

}
module.exports = recommendation;