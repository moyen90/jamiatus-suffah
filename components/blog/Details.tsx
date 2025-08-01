"use client"

import { notFound } from "next/navigation";

const blogPosts = [
  {
    id: 1,
    slug: "importance-of-prayer-in-islam",
    title: "Why is Salah (Prayer) Important in Islam?",
    excerpt:
      "Salah is the second pillar of Islam and a daily obligation for every Muslim. It connects the believer with Allah five times a day.",
    answer:
      "Salah purifies the soul, strengthens faith, and serves as a reminder of Allah. The Prophet (ﷺ) said, 'The first matter that the slave will be brought to account for on the Day of Judgment is the prayer.' (Tirmidhi)",
    author: "Islamic Scholar",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Prayer",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    slug: "fasting-benefits-in-islam",
    title: "What are the Benefits of Fasting in Ramadan?",
    excerpt:
      "Fasting in Ramadan is not only a physical act of abstaining from food and drink but also a spiritual training for the believer.",
    answer:
      "Fasting teaches patience, self-control, and empathy for the poor. Allah says in the Quran (2:183), 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.'",
    author: "Islamic Scholar",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Fasting",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    slug: "zakat-obligation",
    title: "Why is Zakat Obligatory for Muslims?",
    excerpt:
      "Zakat is one of the five pillars of Islam, a mandatory form of charity that purifies wealth and helps the needy.",
    answer:
      "Zakat purifies wealth, reduces inequality, and strengthens community ties. The Quran (9:60) defines eight categories eligible to receive zakat, including the poor and needy.",
    author: "Islamic Scholar",
    date: "2024-01-10",
    readTime: "7 min read",
    category: "Charity",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    slug: "hajj-significance",
    title: "What is the Significance of Hajj in Islam?",
    excerpt:
      "Hajj is a once-in-a-lifetime obligation for those who are physically and financially able, symbolizing unity and submission to Allah.",
    answer:
      "Hajj reminds Muslims of equality before Allah, as all pilgrims dress similarly and perform the same rites. The Prophet (ﷺ) said, 'Whoever performs Hajj and does not commit any obscenity or transgression, will return as free from sins as the day his mother bore him.' (Bukhari)",
    author: "Islamic Scholar",
    date: "2024-01-08",
    readTime: "8 min read",
    category: "Hajj",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    slug: "halal-haram",
    title: "What is the Difference Between Halal and Haram?",
    excerpt:
      "Halal refers to what is permissible in Islam, while Haram refers to what is forbidden. These terms guide a Muslim's lifestyle choices.",
    answer:
      "Halal and Haram apply to food, actions, business, and behavior. The Prophet (ﷺ) said, 'What is lawful is clear and what is unlawful is clear.' (Bukhari & Muslim)",
    author: "Islamic Scholar",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Islamic Law",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 6,
    slug: "quran-importance",
    title: "Why is the Quran Considered the Ultimate Guidance?",
    excerpt:
      "The Quran is the word of Allah revealed to Prophet Muhammad (ﷺ) as a complete guide for mankind until the Day of Judgment.",
    answer:
      "The Quran provides guidance, laws, and wisdom. Allah says, 'Indeed, this Qur'an guides to that which is most suitable.' (Quran 17:9)",
    author: "Islamic Scholar",
    date: "2024-01-03",
    readTime: "9 min read",
    category: "Quran",
    image: "/placeholder.svg?height=200&width=400",
  },
];



export const Details = ({ slug }: { slug: string }) => {
  console.log(slug)
    const post = blogPosts.find((p) => p.slug === slug)
    console.log(post)

  if (!post) {
    notFound()
  }

    return (
    <div>
        This is Details Page
    </div>
    )
}