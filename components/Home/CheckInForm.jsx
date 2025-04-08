import "./CheckInForm.css";

export default function CheckInForm() {
  return (
    <>
      <form className="checkin-form">
        <textarea
          className="checkin-form-textarea"
          name="textarea"
          id="textarea"
          placeholder="Write down your thoughts here..."
          required
        ></textarea>
        <button className="checkin-form-btn">Save your thoughts</button>
      </form>
    </>
  );
}
