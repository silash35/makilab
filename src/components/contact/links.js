import styles from "./links.module.scss";

export default function Links() {
  return (
    <ul className={styles.links}>
      <li>
        <img src="/resources/icons/email.svg" alt="email Icon" />
        <a href="mailto:contato@makilab.com.br" title="e-mail address">
          contato@makilab.com.br
        </a>
      </li>

      <li>
        <img src="/resources/icons/instagram.svg" alt="instagram Icon" />
        <a
          href="https://www.instagram.com/makilabservicos/"
          title="instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          @makilabservicos
        </a>
      </li>
      <li>
        <img src="/resources/icons/phone.svg" alt="Phone Icon" />
        <a href="tel:+5571985447786" title="Phone number">
          +55 71 98544-7786
        </a>
      </li>
      <li>
        <img src="/resources/icons/phone.svg" alt="Phone Icon" />
        <a href="tel:+5571999646282" title="Phone number">
          +55 71 99964-6282
        </a>
      </li>
      <li>
        <img src="/resources/icons/phone.svg" alt="Phone Icon" />
        <a href="tel:+557121320220" title="Phone number">
          +55 71 2132-0220
        </a>
      </li>
      <li className={styles.whatsapp}>
        <a href="https://api.whatsapp.com/send?phone=5571985447786">
          <img src="/resources/icons/whatsapp.svg" alt="Whatsapp Icon" />
          Whatsapp
        </a>
      </li>
    </ul>
  );
}
