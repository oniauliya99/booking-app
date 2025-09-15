const ContactForm = () => {
  return (
    <div className="bg-gray-300 p-8 rounded-sm shadow-sm  ">
      <form action="">
        <div className="grid md:grid-cols-2 gap-7 mt-6">
          <div>
            {" "}
            <input
              type="text"
              name="name"
              placeholder="Name*"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">message</p>
            </div>
          </div>
          <div>
            {" "}
            <input
              type="email"
              name="email"
              placeholder="jhondoe@example.com*"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">message</p>
            </div>
          </div>
          <div className="md:col-span-2">
            {" "}
            <input
              type="text"
              name="subject"
              placeholder="subject*"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
            />
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">message</p>
            </div>
          </div>
          <div className="md:col-span-2">
            {" "}
            <textarea
              rows={5}
              name="message"
              placeholder="Your Message*"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
            >
              {" "}
            </textarea>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">message</p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="px-10 text-center py-4 font-semibold text-white w-full bg-orange-400 rounded-sm hover:bg-orange-500 cursor-pointer"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
