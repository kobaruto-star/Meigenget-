const { createApp, ref } = Vue;
  // Vuetify を取り出し
  const { createVuetify } = Vuetify;
  // Vuetify を作ってプラグイン登録する
  const vuetify = createVuetify();

  createApp({
    setup(){
      function onClick(){
        alert("お問い合わせはやめてください");
      }

      const page = ref("a");
      console.log(page.value);

      function mainAClick(){
        page.value = "b";
        console.log(page.value);
      }
          function mainBClick(){
        page.value = "a";
        console.log(page.value);
      }
          function coleClick(){
            page.value = "c";
            console.log(page.value);
      }  
      
      const meigen = ref("");
      const auther = ref("");
      
      let response;
      const loading = ref(true);
      const loadfail = ref(false);
      let miscount = 0;
      const GetMeigen = async () => {
        try {
          if(miscount>5){
  loading.value = false;
  loadfail.value = true;
            return;
          }
        loading.value = true;
        loadfail.value = false;
		          response = await axios.get(`https://api.allorigins.win/raw?url=${encodeURIComponent("https://meigen.doodlenote.net/api/json.php")}&t=${Date.now()}`
);
          
    const meigendata = response.data[0];
		console.log(meigendata.meigen);
    console.log(meigendata.auther);
        
        meigen.value = meigendata.meigen;
        auther.value = meigendata.auther; 
        loading.value = false;
        miscount = 0;
}catch{

  loading.value = false;
  loadfail.value = true;
  miscount ++;
console.log(`エラー1です(${miscount}回目)`);  
  
  GetMeigen();
  
}
      } //asyncここまで
      
      GetMeigen();
      
      function onemoreClick(){
        console.log("もう一度を押した");
        GetMeigen();
      }
      
      const favs = ref([]);
      
      function favoClick(){
        console.log("お気に入りを押した")
        favs.value.push({
          meigen:meigen.value,
          auther:auther.value
        }) 
        console.log(fav);
      }
      
      const  delfav = ref("false")
      
      function delfavClick(){
        favs.value = [];
        console.log("削除しました");
      }
      
      
      
    return{ onClick,mainAClick,mainBClick,page ,coleClick,meigen,auther,onemoreClick,loading,loadfail,favoClick,favs,delfavClick};    
    }

  }).use(vuetify).mount('#app');