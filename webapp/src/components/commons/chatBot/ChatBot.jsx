import { useState, useRef, useEffect } from 'react'
import {Send, MessageCircle} from 'lucide-react'

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const messageEndRef = useRef(null)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = async () => {

    if(input.trim() == "") return

    const userText = input
    const userMessage = {
      text: userText,
      role: "user"
    }

    setHistory((prevHistory) => [...prevHistory, userMessage])
    console.log(history)
    setInput("")
    setLoading(true)

    try {
      console.log(import.meta.env.PUBLIC_API_CHATBOT_URL)
      const response = await fetch(import.meta.env.PUBLIC_API_CHATBOT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({question: userText})
      })
      const data = await response.json()

      const botMessage = {
        text: data.reply,
        role: "bot"
      }
      setHistory((prevHistory) => [...prevHistory, botMessage])

    } catch (error) {
      console.error(error)
      setHistory((prevHistory) => [...prevHistory, {text: "Error de conexión 😓", role: "bot"}])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({behaviour: "smooth"})
    }
  }, [history])

  return (
    <>
      {isOpen && (
        <div className='
          flex flex-col fixed
          w-full sm:w-96 md:w-[425px]
          h-[70vh] sm:h-[500px] md:h-[600px]
          bottom-0 sm:bottom-10 md:bottom-20
          right-0 sm:right-4 md:right-10
          rounded-t-2xl sm:rounded-2xl
          shadow-2xl
          z-50
        '>
          {/* Header */}
          <div className='
            bg-[#0f172a] 
            border-b-2 border-gradient
            flex justify-between items-center
            px-4 py-3
            sm:px-6 sm:py-4
          '>
            <span className='text-[#69c7c7] font-bold text-lg sm:text-xl'>
              Chatbot IA
            </span>
            <button 
              onClick={toggleChat}
              className='
                text-white
                hover:text-[#69c7c7]
                transition-colors
                text-xl
              '
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className='
            flex-1 
            overflow-y-auto 
            bg-[#111827]
            p-1
          '>
            {history.map((message, index) => (
              <div key={index}
              className={`
                flex ${message.role === 'user' ? 'justify-end': 'justify-start'}
                max-w-full`
              }
              >
                <p 
                  className=' bg-[#1f2937]
                  p-2 m-1.5
                  max-w-3/4 break-words
                  rounded-b-lg'>{message.text}
                </p>
              </div>
            ))}
            {loading && (<div className=' flex justify-start max-w-full'>
              <p className='bg-[#1f2937] p-2 m-1.5 rounded-b-lg'>Pensando...</p>
            </div>)}

            <div ref={messageEndRef} />
          </div>

          {/* Footer */}
          <div className='
            bg-[#0f172a]
            border-t-2 border-[#7836cf]
            p-4 sm:p-4
            flex gap-2 sm:gap-3
          '>
            <input 
              placeholder='Escribe tu pregunta...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className='
                flex-1
                bg-[#1f2937]
                text-white
                px-3 sm:px-4
                py-2 sm:py-3
                rounded-lg
                border border-transparent
                focus:border-[#69c7c7]
                focus:outline-none
                transition-colors
                text-sm sm:text-base
              '
            />
            <button 
              onClick={handleSubmit}
              className='
                bg-[#7836cf]
                hover:bg-[#69c7c7]
                px-3 sm:px-7
                py-2 sm:py-3
                rounded-lg
                transition-colors
                font-semibold
                text-sm sm:text-base
            '>
              <Send size={20} color="white"/>
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button 
          onClick={toggleChat}
          id='open-chat'
          className='
            fixed
            bottom-4 sm:bottom-6 md:bottom-10
            right-4 sm:right-6 md:right-10
            flex justify-center items-center
            bg-[#7836cf]
            hover:bg-[#69c7c7]
            text-white
            rounded-full
            size-12 sm:size-14 md:size-16
            shadow-lg
            transition-colors
            text-2xl
            z-50
          '
        >
          <MessageCircle />
        </button>
      )}
    </>
  )
}
