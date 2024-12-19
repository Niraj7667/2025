import React, { useState, useEffect } from 'react';
import { Star, Gift, Sparkles, Clock } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './page.css';
import { Inpostad } from './ads';
import axios from 'axios';

const NewYearApp = ({ wisher = 'Your Name' }) => {
  const { wisher: paramWisher } = useParams();
  const [userName, setUserName] = useState(paramWisher || wisher);
  const [timeLeft, setTimeLeft] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [shayari, setShayari] = useState('');
  const navigate = useNavigate();

  // List of Shayaris
  const shayaris = [
    "मिले आपको शुभ संदेश, धरकर खुशियों का वेश पुराने साल को अलविदा कहें, आने वाले नव वर्ष की हार्दिक बधाई।",
    "नया साल आया बनकर उजाला, खुल जाए आपकी किस्मत का ताला, हमेशा आप पर मेहरबान रहे ऊपर वाला, यही दुआ करता है आपका ये दोस्त प्यारा।",
    "सुख, संपत्ति, सादगी, सफलता, स्वास्थ्य, सम्मान शान्ति एवं समृध्दि मंगलकामनाओं के साथ मेरे एवं मेरे परिवार की तरफ से आपको और आप के परिवार को नये साल की हार्दिक शुभकामनाएं।",
    "सदा दूर रहो गम की परछाइयों से सामना न हो कभी तन्हाईयों से, हर अरमान हर ख्वाब पूरा हो आपका, यही दुआ है दिल की गहराइयों से नव वर्ष की हार्दिक शुभकामनाएं।",
    "न कोई रंज का लम्हा आपके पास आए खुदा करे कि नया साल सब को रास आए, सपने लाया हूं... दस्तक दी किसी ने कहा सपने लाया हूं, खुश रहो आप हमेशा, इतनी दुआ लाया हू। Happy New Year 2025",
    "इस नए साल में.. जो तू चाहे वो तेरा हो, हर दिन ख़ूबसूरत और रातें रोशन हो, कमियाबी चूमती रहे तेरे कदम हमेशा यार, नया साल मुबारक हो तुझे मेरे यार।",
    "नवंबर गया, दिसंबर गया, गए सारे त्योहार, नए साल की बेला पर झूम रहा संसार, अब जिसका आपको था बेसब्री से इंतजार, मंगलमय हो आपका 2025 का साल। Happy New Year 2025",
    "खुशियों की बोछार दोस्ती है एक खूबसूरत प्यार दोस्ती है साल तो आते जाते रहते हैं पर सदा बहार होती दोस्ती है!",
    "मिले आपको शुभ संदेश, धरकर खुशियों का वेश पुराने साल को अलविदा कहें आने वाले नव वर्ष की हार्दिक बधाई!",
    "हर साल कुछ देकर जाता है, हर नया साल कुछ लेकर आता है, चलो इस साल कुछ अच्छा करके दिखाए नया साल मनाएंगे!",
    "शब्दों का कंगन, दुआओं का धागा, खुशियों का तिलक, सफलता का साया, यही हो आपके नए साल का नया आयाम ! नए साल की बधाई आपको!",
    "पुराना साल सबसे हो रहा है दूर, क्या करें यही है कुदरत का दस्तूर, बीती यादें सोच कर उदास न हो तुम, कीजिए खुशियों के साथ नये साल को मंजूर!",
    "अच्छे लोगों को हम दिल में रखते हैं उनकी खुशियों के लिए दर्द सहते हैं कोई हमसे पहले विश न कर दे आपको इसलिए सबसे पहले हैप्पी न्यू ईयर करते हैं!",
    "कोई मुझसे पहले न बोल दे इसलिए सोचा क्यों न आज ही आपको हैप्पी न्यू इयर बोल दूं। नए साल की बधाई आपको!",
    "नया साल आया बनकर उजाला, खुल जाए आपकी किस्मत का ताला हमेशा आप पर मेहरबान रहे ऊपर वाला यही दुआ करता है आपका ये दोस्त प्यारा! नववर्ष की ढेरों शुभकामनाएं।",
    "दुख का एक लम्हा भी आपके पास न आए दुआ है मेरी कि ये साल आपके लिए खास बन जाए! नया साल मुबारक हो आपको!",
    "गुल ने गुलशन से गुलफाम भेजा है सितारों ने आसमान से सलाम भेजा है मुबारक हो आपको नया साल हमने एडवांस में यह पैगाम भेजा है।",
    "नए वर्ष में नया हौसला, नया उत्साह, नए सपने, नई उम्मीदें। हर कदम पर मिले खुशियों के साथ जीत। नया साल मुबारक हो आपको!",
    "भूल जाओ पुराना कल, दिल में बसा लो आज को, खुशियां लेकर आएगा आने वाला कल। Happy New Year 2025!",
    "रिश्ते को यूं ही बनाए रखना, दिलों में चिराग हमारी यादों के जलाए रखना, 2024 का सुहाने सफर के लिए शुक्रिया, ऐसे ही 2025 में अपना साथ बनाए रखना। Happy New Year 2025 Best Msg",
    "आशा है कि आने वाले साल का हर दिन खुशी और उत्साह मनाने के मौके लेकर आए। नए साल के लिए खुशियों भरी शुभकामनाएं।",
    "आपकी आंखों में सजे है जो भी सपने, यह नया वर्ष उन्हें सच कर जाए। Happy New Year",
    "आशा है नया साल आपके लिए सफलता की नई उंचाई और खुशहाली लेकर आए। नया साल की हार्दिक शुभकामनायें। Happy New Year",
    "इस नए साल आपको आपके सपनों की मंजिल मिले, खुशियों भरा हो आपका ये वर्ष भी, 2025 आपकी जिन्दगी में खुशियों की बहार लाए। Happy New Year",
    "नए वर्ष की पावन बेला में है यही, शुभ संदेश,हर दिन आए आपके, जीवन में लेके खुशियां विशेष, नववर्ष की शुभकामनाएं।",
    "दीघयियरोग्ययस्तु। सुयशः भवतु। विजयः भवतु। नववर्ष 2024 शुभेच्छा",
    "नए साल पर खुशियों की बरसात हो, प्यार के दिन और मोहब्बत वाली रात हो, रंजिश और नफरत मिट जाए सदा के लिए, सभी के दिलों में ऐसी चाहत हो",
    "खुशियों की बोछार दोस्ती है, एक खुबसूरत प्यार दोस्ती है, साल तो आते जाते रहते हैं, पर सदा बहार होती दोस्ती है.",
    "हर साल आता है, हर साल जाता है, इस साल आपको.. वो सब मिले, जो आपका दिल चाहता है.",
    "कोई मुझसे पहले न बोल दे इसलिए सोचा क्यों न आज ही आपको हैप्पी न्यू इयर बोल दूं।",
    "इस साल आपके घर खुशियों की हो धमाल, दौलत की न हो कमी आप हो जाएं मालामाल, हस्ते मुस्कुराते रहो ऐसा हो सबका परिवार, तहे दिल से मुबारक हो आपको नया साल.",
    "मछली को English में कहते हैं Fish, हम आपको बड़ा करते हैं Miss, हमसे पहले कोई और ना कर दे Wish, इसलिए सबसे पहले आपको, कर रहे हैं दिल से Wish…"
  ];

  // Set the initial shayari (last one in the list)
  const [currentShayariIndex, setCurrentShayariIndex] = useState(shayaris.length - 1);

  // Function to choose a random shayari
  const getRandomShayari = () => {
    const randomIndex = Math.floor(Math.random() * shayaris.length);
    return randomIndex;
  };

  useEffect(() => {
    // Initially set the first shayari (last one in the list)
    setShayari(shayaris[currentShayariIndex]);

    // Change shayari on each refresh
    setCurrentShayariIndex(getRandomShayari());
  }, [currentShayariIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const newYear = new Date('January 1, 2025 00:00:00').getTime();
      const distance = newYear - now.getTime();

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    const { value: tempName } = await Swal.fire({
      title: 'Enter Your Name',
      input: 'text',
      inputLabel: 'Your Name',
      inputPlaceholder: 'Type your name here',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter your name!';
        }
      }
    });

    if (tempName) {
      setUserName(tempName);
      const shareMessage = `Happy New Year 2025 from ${tempName}! Wishing you joy, prosperity, and success.`;
      const shareUrl = `${window.location.origin}/${tempName}`;

      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Happy New Year 2025',
            text: shareMessage,
            url: shareUrl,
          });
        } else {
          await navigator.clipboard.writeText(`${shareMessage}\n${shareUrl}`);
          Swal.fire({
            title: 'Success!',
            text: 'Link copied to clipboard!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
          });
        }
      } catch (error) {
        console.error('Sharing failed:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Sharing failed. Please try again.',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }
    }
  };

  return (
    <div className="new-year-container">
      <div className="celebration-overlay">
        <div className="stars-container">
          {Array.from({ length: 50 }).map((_, index) => (
            <Star
              key={index}
              className="floating-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="new-year-content">
          <h1 className="glow-text">
            <Sparkles className="icon" /> Happy New Year 2025 <Sparkles className="icon" />
          </h1>

          <div className="countdown-container">
            <Clock className="clock-icon" />
            <h3 className="countdown-text">
              {timeLeft}
            </h3>
          </div>

          <div className="greetings-container">
            <div className="greeting-card">
              <h2>From {userName}:</h2>
              <p className="greeting-text">
                Wishing you and your family a very Happy New Year 2025! May this year bring joy, prosperity, and success to your lives.
              </p>
              <p className="greeting-text hindi-text">
                आप और आपके परिवार को नववर्ष 2025 की हार्दिक शुभकामनाएँ!
              </p>
            </div>
          </div>

          <div className="greetings-container">
            <div className="greeting-card">
              <p className="greeting-text">{shayari}</p>
            </div>
          </div>

          <button className="share-btn" onClick={handleShare}>
            Share Greetings
          </button>
          {/* <Inpostad />Add Inpostad here */}
        
        </div>
      </div>
    </div>
  );
};

export default NewYearApp;
