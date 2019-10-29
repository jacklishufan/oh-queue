let RequestForm = (props) => {
  let state = props.state;
  let disabled = !!props.disabled;

  let submit = (e) => {
    e.preventDefault();
    let form = $('#request-form');
    let descriptionBox = $('#description-box');

    let formData = {};
    form.serializeArray().forEach((input) => {
      formData[input.name] = input.value;
    });

    formData['description'] = descriptionBox.val();

    app.makeRequest('create', formData, true);
    $('#description-overlay').hide();
  };

  let show = (e) => {
    e.preventDefault();
    let form = $('#request-form');
    let formDOM = form[0];
    if(formDOM.reportValidity && !formDOM.reportValidity()) {
      return;
    }

    $('#description-overlay').show();
  }

  let {assignments, locations} = state;

  let filteredAssignments = Object.values(assignments).filter((assignment) => assignment.visible).sort((a, b) => a.name.localeCompare(b.name));
  let filteredLocations = Object.values(locations).filter((location) => location.visible).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <form id="request-form">
        <div className="form-group form-group-lg">
          <div className="input-group">
            <SelectPicker options={filteredAssignments} className="selectpicker form-control form-left" data-live-search="true" data-size="8" data-width="60%" data-style="btn-lg btn-default" id="assignment_id" name="assignment_id" title="Assignment" required disabled={disabled} />
            <input className="form-control form-right" type="text" id="question" name="question" title="Question" placeholder="Question" required disabled={disabled} />
          </div>
        </div>
        <div className="form-group form-group-lg">
          <div className="input-group">
            <SelectPicker options={filteredLocations} className="selectpicker form-control form-left" data-live-search="true" data-size="8" data-width="60%" data-style="btn-lg btn-default" id="location_id" name="location_id" title="Location" required disabled={disabled} />
            <div className="input-group-btn form-right pull-left">
              <button className="btn btn-lg btn-default" onClick={show} disabled={disabled}>Request</button>
            </div>
          </div>
        </div>
      </form>
      <div id="description-overlay" className="description-overlay">
        <div id="description-form" className="description-form">
          <div>
            <h4> Please describe your issue below: </h4>
            <textarea id="description-box" className="description-box"
            rows="5" placeholder="It would be helpful if you could describe your issue. For example, &quot;I have a SyntaxError in my ___ function. I've tried using ____ and ____.&quot;"  />
            <button className="btn btn-lg btn-default" onClick={submit} disabled={disabled}>Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};
