# Urdu AI Prompts Library

Ready-to-use prompts for using **Claude, ChatGPT, Gemini** and other AI assistants in Urdu and Roman Urdu. Copy a prompt, replace the parts in `[brackets]`, and paste it into the AI.

> **Tip:** AI models understand Roman Urdu well, but they reply much better in proper Urdu script when you **ask for it clearly** and say who the reader is. Every prompt below does that.

## Contents

- [Business and customers](#business-and-customers)
- [Translation and explanation](#translation-and-explanation)
- [Writing and content](#writing-and-content)
- [Learning and study](#learning-and-study)
- [Daily life](#daily-life)
- [How to write your own Urdu prompts](#how-to-write-your-own-urdu-prompts)

---

## Business and customers

### 1. Reply to a customer on WhatsApp

```text
You are a polite customer support agent for my shop, [shop name], which sells [products].
A customer sent this message:

"[paste customer message]"

Write a short, friendly WhatsApp reply in simple Roman Urdu (Urdu written in English letters),
the way Pakistani shopkeepers write. Answer every question in the message. Do not promise
anything I haven't told you. Keep it under 60 words.
```

### 2. Handle a complaint calmly

```text
Ek customer naraz hai. Us ka message ye hai:

"[paste message]"

Is ka jawab Urdu (Urdu script) mein likho. Pehle maafi maango, phir masle ka hal batao:
[what you will do, e.g. "kal tak replacement bhej denge"]. Lehja narm aur izzat wala ho.
Jawab 4-5 jumlon se zyada na ho.
```

### 3. Product description in Urdu

```text
Write a product description in Urdu script for an online store in Pakistan.

Product: [name]
Details: [material, size, colour, price]
Customers: [who buys it]

Write 1 catchy heading, 4 short bullet points of benefits, and 1 line asking them to order
on WhatsApp. Use simple everyday Urdu, not difficult literary words.
```

### 4. Quotation or invoice message

```text
Mere client ko quotation bhejni hai. Details:
- Kaam: [description]
- Raqam: Rs [amount]
- Delivery: [days]
- Payment: [terms, e.g. 50% advance]

Ek professional message likho, pehle English mein aur phir neeche wahi message Urdu script mein.
Raqam ko figures aur alfaaz dono mein likho (lakh/hazar wala nizam).
```

### 5. Social media post

```text
Mere business [name] ke liye Facebook aur Instagram post likho.
Mauqa: [sale / new arrival / Eid offer]
Offer: [details]

3 options do: ek Urdu script mein, ek Roman Urdu mein, aur ek English mein.
Har post 50 alfaaz se kam ho, 3-4 emoji aur 5 hashtags ke saath.
```

---

## Translation and explanation

### 6. Translate English into simple Urdu

```text
Translate the text below into simple, natural Urdu (Urdu script) that a person with
a matric-level education can easily understand. Keep technical words in English inside
brackets the first time they appear.

Text:
"""
[paste text]
"""
```

### 7. Explain a difficult document

```text
Ye [contract / bank letter / government notice / email] hai. Mujhe Urdu mein asaan alfaaz
mein samjhao:
1. Ye kis baare mein hai (2 lines)
2. Mujhe kya karna hai aur kab tak
3. Koi khatra ya chhupi hui shart
4. Mushkil alfaaz ka matlab

"""
[paste text]
"""
```

### 8. Convert Roman Urdu to Urdu script

```text
Neeche diye gaye Roman Urdu text ko sahi Urdu script mein likho. Spelling durust rakho
(misal: "mehnat" = محنت، "safai" = صفائی)۔ Matlab mein koi tabdeeli na karo.

"""
[paste Roman Urdu]
"""
```

> For instant offline conversion you can also use `romanToUrdu()` from this package, or the free tool at [zexcart.site/dev-tools](https://zexcart.site/dev-tools/).

---

## Writing and content

### 9. Formal application (darkhwast)

```text
Ek rasmi darkhwast Urdu script mein likho.
Kis ke naam: [e.g. Principal sahib / Manager sahib]
Mauzu: [e.g. 3 din ki chhutti]
Wajah: [reason]
Mera naam: [name]

Darkhwast ka puraana rasmi andaz use karo ("Janab-e-Aali", "Guzarish hai ke", "Aap ka
farmanbardar"). Ek page se zyada na ho.
```

### 10. Blog article in Urdu

```text
"[topic]" par ek blog article Urdu script mein likho, Pakistani readers ke liye.
- 600-800 alfaaz
- Ek dilchasp shuruat, 4-5 headings, aakhir mein khulasa
- Asaan zabaan, chhote jumle
- Agar koi number ya fact likho jis par tumhe yaqeen na ho, to us ke saath [check karein] likh do
```

### 11. Speech or announcement

```text
[event, e.g. school function / company dinner / masjid announcement] ke liye 2 minute ki
taqreer Urdu mein likho. Shuru mein salam aur shukriya, darmiyan mein [main points],
aur aakhir mein dua ya achhi baat. Lehja [rasmi / dosti wala] ho.
```

---

## Learning and study

### 12. Explain a concept like a teacher

```text
Mujhe "[topic, e.g. compound interest / photosynthesis / how the internet works]" Urdu mein
aise samjhao jaise ek achha ustaad 14 saal ke bachche ko samjhata hai.
Roz-marra ki Pakistani misaalein do. Aakhir mein 3 sawal do taake main check kar sakun ke samajh aaya.
```

### 13. Make a quiz

```text
"[topic]" par 10 MCQs Urdu script mein banao. Har sawal ke 4 options hon. Aakhir mein
alag se answer key do, aur har jawab ke saath ek line mein wajah.
```

### 14. Practice English with Urdu help

```text
Main English seekh raha/rahi hoon. Main English mein ek paragraph likhunga. Tum:
1. Ghaltiyan theek karo
2. Har ghalti ki wajah Urdu mein samjhao
3. Aakhir mein behtar version do

Mera paragraph: "[paste]"
```

---

## Daily life

### 15. Plan a monthly budget

```text
Meri mahana aamdani Rs [amount] hai. Ghar mein [number] log hain, [city] mein rehte hain.
Kharche: kiraya Rs [x], bijli/gas Rs [y], school fees Rs [z].

Urdu mein ek mahana budget plan banao: table ki shakal mein, aur 5 tajaweez jin se
bachat ho sake. Raqam lakh/hazar wale tareeqe se likho.
```

### 16. Write a polite message to a relative or neighbour

```text
Mujhe apne [relative / neighbour] ko ek message bhejna hai ke [situation].
Is ko Urdu script mein izzat aur narmi se likho, taake bura na lage. 3-4 jumle.
```

---

## How to write your own Urdu prompts

1. **Batayein ke jawab kis script mein chahiye.** "Urdu script mein" ya "Roman Urdu mein" saaf likhein. Warna AI aksar English mein jawab deta hai.
2. **Parhne wale ka batayein.** "Matric pass shakhs", "client", "bachcha", "boss". Is se zabaan ka level theek ho jata hai.
3. **Lambai batayein.** "4 jumle", "50 alfaaz", "1 page".
4. **Lehja batayein.** Rasmi (formal), dosti wala, narm, ya professional.
5. **Misaal dein.** Agar khaas andaz chahiye to ek chhota sa namoona saath mein de dein.
6. **Facts check karein.** AI kabhi kabhi ghalat number ya qanooni baat likh deta hai. Paise, qanoon ya sehat ki baat ho to kisi mahir se tasdeeq zaroor karein.

---

Have a prompt that works well in Urdu? [Add it with a pull request](../CONTRIBUTING.md) or [open an issue](https://github.com/mubasher1111/urdu-toolkit/issues).
