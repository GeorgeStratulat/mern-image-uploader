import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { StoreState } from "../../reducers";
import { ActionTypes, IUser } from "../../actions";
import Spinner from "../utils/Spinner/Spinner";

interface Props extends StoreState {
  persistUser: (user: IUser) => { type: ActionTypes };
}
interface State {
  selectedImage: File | null;
  visible: boolean;
  modalImage: string;
  loading: boolean;
}

class Dashboard extends Component<Props, State> {
  state = {
    selectedImage: null,
    visible: false,
    modalImage: "",
    loading: false,
  };

  openModal = (src: string) => {
    this.setState({ modalImage: src, visible: true });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  imageSelectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.imageUploadHandler(e.target.files![0], e.target.files![0].name);
  };

  imageUploadHandler = (image: File, imageName: string) => {
    const fd = new FormData();
    fd.append("image", image, imageName);
    axios
      .post("/images/add", fd, {
        onUploadProgress: () => {
          this.setState({ loading: true });
        },
      })
      .then((res) => {
        this.props.persistUser(res.data as IUser);
        this.setState({ loading: false });
      });
  };

  render() {
    const { currentUser } = this.props.auth;
    const { visible, modalImage, loading } = this.state;
    return (
      <div className="container">
        <h4 className="form-label">Default file input example</h4>
        <input
          type="file"
          className="form-control"
          id="customFile"
          onChange={this.imageSelectHandler}
        />
        {loading && <Spinner />}
        <div className="card">
          <div className="card-body">
            {currentUser &&
              currentUser.images &&
              currentUser.images.length > 0 &&
              currentUser.images.map((item, index) => (
                <img
                  className="img-thumbnail"
                  src={item}
                  key={index}
                  alt="icon"
                  onClick={() => {
                    this.openModal(item);
                  }}
                />
              ))}
          </div>
        </div>
        <Modal size="xl" show={visible} onHide={this.hideModal}>
          <Modal.Body>
            <img alt="alt" className="modal-image" src={modalImage} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
  users: state.users,
  alerts: state.alerts,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  persistUser: (user: IUser) => {
    return dispatch({ type: ActionTypes.persistUser, payload: user });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
