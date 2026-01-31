import { test, expect } from '@playwright/test';

test.describe('Thanglish → Tamil Conversion Tests', () => {

  // Positive Functional Tests
  const positiveTests = [
    { id: 'pos_fun_001', input: 'nee eppadi irukka ? ', expected: 'நீ எப்படி இருக்க ?' },//1
    { id: 'pos_fun_002', input: 'enakku thanneer thara mudiyumaa ? ', expected: 'எனக்கு தண்ணீர் தர முடியுமா ?' },//2
    { id: 'pos_fun_003', input: 'naan poai varugiren ', expected: 'நான் போய் வருகிறேன்' },  //error //3
    { id: 'pos_fun_004', input: 'enakku indha vishayam pathi theriyadhu ', expected: 'எனக்கு இந்த விஷயம் பத்தி தெரியாது' },//4
    { id: 'pos_fun_005', input: 'enakku kaaichchal kaaranamaaha naan paadasaalaikku sellavillai ', expected: 'எனக்கு காய்ச்சல் காரணமாக நான் பாடசாலைக்கு செல்லவில்லை' },//5
    { id: 'pos_fun_006', input: 'nee saappittal naan saappiduven ', expected: 'நீ சாப்பிட்டால் நான் சாப்பிடுவேன்' },//6
    { id: 'pos_fun_007', input: 'nee athai sariyaaha seithaai ', expected: 'நீ அதை சரியாக செய்தாய்' },//7
    { id: 'pos_fun_008', input: 'athai poai seidaa ', expected: 'அதை போய் செய்டா' },//8
    { id: 'pos_fun_009', input: 'naan naalaikku yalpaanam poven ', expected: 'நான் நாளைக்கு யாழ்ப்பாணம் போவேன்' },//8
    { id: 'pos_fun_010', input: 'enakku romba theriyadhu aana konjam puriyum ', expected: 'எனக்கு ரொம்ப தெரியாது ஆனா கொஞ்சம் புரியும்' }, //9
    { id: 'pos_fun_011', input: 'konjam velai irukku adhanaala naan poren ', expected: 'கொஞ்சம் வேலை இருக்கு அதனால நான் போறேன்' },//10
    { id: 'pos_fun_012', input: 'Aiyo ! Avan nalla paiyan ', expected: 'ஐயோ ! அவன் நல்ல பையன்' }, //11
    { id: 'pos_fun_013', input: 'avargal varugai purindhaargal ', expected: 'அவர்கள் வருகை புரிந்தார்கள்' },//12
    { id: 'pos_fun_014', input: 'sari naan seigiren ', expected: 'சரி நான் செய்கிறேன்' }, //13
    { id: 'pos_fun_015', input: 'naan Chennai pogiren ', expected: 'நான் சென்னை போகிறேன்' }, //14
    { id: 'pos_fun_016', input: 'Zoom meeting-ku vara poren ', expected: 'ஜூம் மீட்டிங்-கு வர போறேன்' }, //15
    { id: 'pos_fun_017', input: 'aval ellathayum therinjirundhaa ', expected: 'அவள் எல்லாத்தையும் தெரிஞ்சிருந்தா' },//16
    { id: 'pos_fun_018', input: 'munnaadi vanthu utkaaru ', expected: 'முன்னாடி வந்து உட்காரு' }, //17
    { id: 'pos_fun_019', input: 'eethu thara mudiyumaa? ', expected: 'இது தர முடியுமா?' }, //18
    { id: 'pos_fun_020', input: 'naan inru veduiku senren ', expected: 'நான் இன்று வீட்டுக்கு சென்றேன்' }, //19
    { id: 'pos_fun_021', input: 'Naan saapida poren ', expected: 'நான் சாப்பிட போறேன்' }, //20
    { id: 'pos_fun_022', input: 'naan varuven ', expected: 'நான் வருவேன்' }, //21
    { id: 'pos_fun_023', input: 'namma oor romba azhaga irukku ', expected: 'நம்ம ஊர் ரொம்ப அழகா இருக்கு' }, //22

    {
      id: 'pos_fun_024',
      input: 'Netru nadanththa college aandu vizhaavil maanavargal , peraasiriyargal matrum sirappa virundhinargal kalandhu kondu pala kalaachara nigazhchigalai rasiththu , nigazhchiyin sirappai anaivarum paaraattinaargal ',
      expected: 'நேற்று நடந்த காலேஜ் ஆண்டு விழாவில் மாணவர்கள் , பேராசிரியர்கள் மற்றும் சிறப்ப விருந்தினர்கள் கலந்து கொண்டு பல கலாச்சார நிகழ்ச்சிகளை ரசித்து , நிகழ்ச்சியின் சிறப்பை அனைவரும் பாராட்டினார்கள்'
    },//23;
    {
      id: 'pos_fun_025',
      input: 'avan nanban birthday ku gift konduponan ', expected: 'அவன் நண்பன் பர்த்டே கு கிபிட் கொண்டுபோனான்'
    }//24
  ];

  positiveTests.forEach(({ id, input, expected }) => {
    test(`Positive Test ${id}: "${input}" → "${expected}"`, async ({ page }) => {
      test.setTimeout(120000);
      await page.goto('https://tamil.changathi.com/');
      const inputBox = page.locator('#transliterateTextarea');

      // Typing input slowly to simulate real typing
      await inputBox.fill('');
      await inputBox.type(input, { delay: 100 });
      await page.waitForTimeout(500); // wait for conversion

      const convertedText = await inputBox.evaluate(el => el.value.trim());
      await expect(convertedText).toBe(expected);
    });
  });

  // Negative / Robustness Tests
  const negativeTests = [
    { id: 'Neg_fun_0001', input: 'andha ponnu ellam arivaa iruppaa ', expected: 'அந்த பொண்ணு எல்லாம் அறிவா இருப்பாள்' },
    { id: 'Neg_fun_0002', input: 'Enaku Abdul kalam aiyavai mihavum pidikkum ', expected: 'எனக்கு அப்துல் கலாம் ஐயாவை மிகவும் பிடிக்கும்' },
    { id: 'Neg_fun_0003', input: 'Rs5343 ', expected: 'ரூ. 5343' },
    { id: 'Neg_fun_0004', input: 'naan 2 apple saapiduven ', expected: 'நான் 2 ஆப்பிள் சாப்பிடுவேன்' },
    { id: 'Neg_fun_0005', input: 'Thx machan ', expected: 'நன்றி நண்பா' },
    { id: 'Neg_fun_0006', input: '0578989453 ', expected: '0578989453' },
    { id: 'Neg_fun_0007', input: 'naanpoven ', expected: 'நான் போவேன்' },
    { id: 'Neg_fun_0008', input: 'naan saapittaen ', expected: 'நான் சாப்பிட்டேன்' },
    {
      id: 'Neg_fun_0009',
      input: 'Naan 20-02-2026 la Bangalore poganum nu decide panninen. Bus 07:45 AM la depart aagum. Terminal ku 1.5 hours munnaadi poganum nu plan panninen. Veetla 2 kg rice, 1 liter oil and 5 packets biscuits vaangi vechurundhen. Weather forecast 20-02-2026 ku 25°C to 30°C nu kaattuthu. Bangalore la night 09:00 PM ku 70% humidity irukum nu sonnaanga. Journey la 4 km walk pannitu metro ku shift panninen. College reopening 15-06-2026 ku irukku, so students kku bag size 18 inches height, 12 inches width nu measure panninen. Office ku laptop stand order panninen, adhu 0.4 meters height and 0.5 meters width irukum. Kitchen la water storage ku 30 liters tank vaichirukkom, wall height 2.8 meters, length 4 meters. 22-02-2026 ku dentist appointment irukku, time 04:15 PM. Monthly internet usage 180 GB irundhadhu, mobile data balance 2 GB remaining irundhadhu. Naan last month la gym join panninen, distance 3 km cycle panni reach panninen.',

      expected: 'நான் 20-02-2026 லா பெங்களூர் போகணம் னு டிசைட் பண்ணினேன். பஸ் 07:45 AM லா டிபார்ட் ஆகும். டெர்மினல் கு 1.5 ஹவர்ஸ் முன்னாடி போகணம் னு பிளான் பண்ணினேன். வீட்டுல 2 kg ரைஸ், 1 லிட்டர் ஆயில் மற்றும் 5 பேக்கெட்ஸ் பிஸ்கட் வாங்கி வைச்சிருந்தேன். வெதர் ஃபோர்காஸ்ட் 20-02-2026 கு 25°C to 30°C னு காட்டுது. பெங்களூர் லா நைட் 09:00 PM கு 70% ஹியூமிடிடி இருக்கும் னு சொன்னாங்க. ஜர்னி லா 4 km வாக் பண்ணிட்டு மெட்ரோ கு ஷிப்ட் பண்ணினேன். காலேஜ் ரீஓப்பனிங் 15-06-2026 கு இருக்கு, சோ ஸ்டூடன்ட்ஸ் க்கு பேக் சைஸ் 18 இன்சஸ் ஹைட், 12 இன்சஸ் விர்த் னு மெஷர் பண்ணினேன். ஆபீஸ் கு லாப்டாப் ஸ்டாண்ட் ஆர்டர் பண்ணினேன், அது 0.4 மீட்டர்ஸ் ஹைட் மற்றும் 0.5 மீட்டர்ஸ் விர்த் இருக்கும். கிச்சன் லா வாட்டர் ஸ்டோரேஜ் கு 30 லிட்டர்ஸ் டாங்க் வைச்சிருக்கோம், வால் ஹைட் 2.8 மீட்டர்ஸ், லெங்க்த் 4 மீட்டர்ஸ். 22-02-2026 கு டென்டிஸ்ட் அப்பாயிண்மென்ட் இருக்கு, டைம் 04:15 PM. மாதம் இன்டர்நெட் யூசேஜ் 180 GB இருந்தது, மொபைல் டேட்டா பாலன்ஸ் 2 GB ரிமெய்னிங் இருந்தது. நான் லாஸ்ட் மந்த் லா ஜிம் ஜாயின் பண்ணினேன், டிஸ்டன்ஸ் 3 km சைக்கிள் பண்ணி ரீச் பண்ணினேன்.'
    },
    { id: 'Neg_fun_0010', input: 'Aiyo!!! Avan nalla paiyan ', expected: 'ஐயோ! அவன் நல்ல பையன்' }




  ];

  negativeTests.forEach(({ id, input, expected }) => {
    test(`Negative Test ${id}: "${input}" → "${expected}"`, async ({ page }) => {
      await page.goto('https://tamil.changathi.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 120000
      });

      const inputBox = page.locator('#transliterateTextarea');
      await inputBox.waitFor();

      await inputBox.fill('');
      await inputBox.type(input);

      await page.waitForTimeout(4000);

      const convertedText = await inputBox.evaluate(el => el.value.trim());

      if (convertedText !== expected) {
        console.log(`Negative Test ${id} → Expected: "${expected}", Got: "${convertedText}"`);
      }

      // Assert that it does NOT match
      expect(convertedText).not.toBe(expected);
    });
  });
});







//  { input: 'type then clear', expected: '' }



