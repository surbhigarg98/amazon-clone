import React from 'react'
import './Home.css'
import Product from './Product'
function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="banner_img"
                 src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt="banner"/>
            </div>
            <div className="product__row">
              <Product id="10"
               title="The lean startup:How constant innnovation create radically successfull buisness paperback."
              price={19.97}
              rating={5}
              image="https://images-na.ssl-images-amazon.com/images/I/51T-sMqSMiL._SX329_BO1,204,203,200_.jpg"
              />
              <Product id="23"
              title="Kenwood KMX750RD/ KMix Stand Mixer 1000W (Red),stylish kitchen mxixer with k-beater"
              price={239.0}
              rating={4}
              image="https://m.media-amazon.com/images/I/51ae8jtSakL._AC_UL320_.jpg"/>
              {/*Product  */}
            </div>
            <div className="product__row">
          <Product id="78"
           title="Samsung Galaxy Watch Active 2 (Bluetooth, 44 mm) - Black, Aluminium Dial, Silicon Straps"
          price={300}
          rating={5}
          image="https://m.media-amazon.com/images/I/61uej9efKYL._AC_UL320_.jpg"/>
          <Product id="45"
           title="All-new Echo Dot (4th Gen) | Next generation smart speaker with powerful bass and Alexa (Black)"
          price={200}
          rating={4}
          image="https://images-eu.ssl-images-amazon.com/images/I/41bhhsXaUoL._AC_SX184_.jpg"/>
          <Product id="89"
          title="New Apple iPad Pro (11-inch, Wi-Fi + Cellular, 512GB) - Silver (2nd Generation)"
          price={900}
          rating={5}
          image="https://m.media-amazon.com/images/I/81gEWsabIYL._AC_UY218_.jpg"/>
          
            </div>
            <div className="product__row">
            <Product id="67"
            title="Samsung 108 cm (43 Inches) LED Smart TV UA43R5570AUXXL (Black) (2019 Model)"
            price={1000}
            rating={3}
            image="https://m.media-amazon.com/images/I/51R+vo8sazL._AC_UY218_.jpg"/>
        
            </div>
            
        </div>
    )
}

export default Home
