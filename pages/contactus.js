import React from "react";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";

//INTERNAL IMPORT
import Style from "../styles/contactus.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

const contactus = () => {
  return (
    <div className={Style.contactus}>
      <div className={Style.contactus_box}>
        <h1>Contact</h1>
        <div className={Style.contactus_box_box}>
          <div className={Style.contactus_box_box_left}>
            <div className={Style.contactus_box_box_left_item}>
              <h3>🗺 ADDRESS</h3>
              <p>
                Photo booth tattooed prism, portland taiyaki hoodie neutra
                typewriter
              </p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>💌 EMAIL</h3>
              <p>c4ei.net@gmail.com</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>☎ PHONE</h3>
              <p>000-000-000-0000</p>
            </div>
            <div className={Style.contactus_box_box_left_item}>
              <h3>🌏 SOCIALS</h3>
              <a href="https://www.threads.net/@c4ei_net" target="_blank">
                <TiSocialFacebook />
              </a>
              <a href="https://www.linkedin.com/in/c4ei/" target="_blank">
                <TiSocialLinkedin />
              </a>
              <a href="https://www.instagram.com/c4ei_net/" target="_blank">
                <TiSocialInstagram />
              </a>
              <a href="https://www.youtube.com/@c4ei_net" target="_blank">
                <TiSocialYoutube />
              </a>
              <a href="https://twitter.com/c4ei_net/" target="_blank">
                <TiSocialTwitter />
              </a>
            </div>
          </div>
          <div className={Style.contactus_box_box_right}>
            <form>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  placeholder="AllAboutHealth"
                  className={formStyle.Form_box_input_userName}
                />
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="email">Email</label>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <HiOutlineMail />
                  </div>
                  <input type="text" placeholder="Email*" />
                </div>
              </div>
              <div className={formStyle.Form_box_input}>
                <label htmlFor="description">Message</label>
                <textarea
                  name="txt_area_Msg"
                  id="txt_area_Msg"
                  cols="30"
                  rows="6"
                  placeholder="메세지를 보낼수 없습니다. c4ei.net@gmail.com 으로 메일 부탁드립니다. Message cannot be sent. Please send an email to c4ei.net@gmail.com."
                ></textarea>
              </div>
              {/* <Button
                btnName="Send Message"
                handleClick={() => {}}
                classStyle={Style.button}
              /> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contactus;
