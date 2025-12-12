import React, { useState, useRef, useEffect } from 'react'

export default function ChatWidget(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([]) // only user messages for now
  const [text, setText] = useState('')
  const endRef = useRef(null)

  useEffect(()=>{
    if(endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  function send(){
    if(!text.trim()) return
    setMessages(m => [...m, { from: 'user', text: text.trim(), id: Date.now() }])
    setText('')
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className="flex flex-col items-end">
        {open && (
          <div className="w-80 md:w-96 bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden mb-3 border">
            <div className="px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-center justify-between rounded-t-lg">
              <div className="font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.84 8.84 0 01-4.017-.939L2 18l1.339-3.206A7.8 7.8 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                Assistant
              </div>
              <button onClick={()=>setOpen(false)} aria-label="Close chat" className="text-amber-100 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-3 h-56 overflow-auto bg-white" style={{scrollBehavior:'smooth'}}>
              {messages.length === 0 && (
                <div className="text-sm text-gray-500">No messages yet. Type your question below and press Send.</div>
              )}

              {messages.map((m)=> (
                <div key={m.id} className="mt-2">
                  <div className="text-right">
                    <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-2 rounded-lg shadow-sm">
                      {m.text}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t bg-amber-50">
              <div className="flex gap-2">
                <input
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-colors"
                />
                <button 
                  onClick={send}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 transition-all shadow-sm"
                >
                  Send
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500">Note: no backend configured — messages are local only.</div>
            </div>
          </div>
        )}

        <button
          onClick={()=>setOpen(o=>!o)}
          aria-label="Open chat"
          className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white w-14 h-14 flex items-center justify-center shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-105"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.84 8.84 0 01-4.017-.939L2 18l1.339-3.206A7.8 7.8 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
