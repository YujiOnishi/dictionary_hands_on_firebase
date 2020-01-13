import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebaseApp from '../plugins/firebase';

class SignUp extends React.Component {

    state = {
        loading: false, //処理中にボタンにspinner表示する制御用
    }

    _isMounted = false;

    //Submitされたら
    handleOnSubmit = (values) => {
        //spinner表示開始
        if (this._isMounted) this.setState({ loading: true });
        //新規登録処理
        firebaseApp.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then(res => {
                //正常終了時
                //spinner表示終了
                if (this._isMounted) this.setState({ loading: false });
                //Homeに移動
                this.props.history.push("/dictionary"); //history.pushを使うためwithRouterしている
            })
            .catch(error => {
                //異常終了時
                if (this._isMounted) this.setState({ loading: false });
                alert(error);
            });
    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="siimple-content siimple-content--extra-small">
            <div className="siimple-h1 siimple--text-normal siimple--mb-1" align="center">
                Dictionary
            </div>
                <div className="siimple--px-5 siimple--py-5">
                    <div className="siimple-h3 siimple--text-normal siimple--mb-1" align="center">
                        -SignUp-
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => this.handleOnSubmit(values)}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required(),
                            password: Yup.string().required(),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, handleBlur, values, errors }) => (
                                <form onSubmit={handleSubmit}>
                                <div className="siimple-field">
                                    <div className="siimple-field">
                                        <div className="siimple-field-label">email</div>
                                        <input className="siimple-input siimple-input--fluid" placeholder="you@email.com" 
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}/>
                                    </div>
                                    <div className="siimple-field-helper">
                                        {errors.email}
                                    </div>
                                    <div className="siimple-field-label">
                                        password
                                    </div>
                                    <input className="siimple-input siimple-input--fluid" placeholder="password" 
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}/>
                                    <div className="siimple-field-helper">
                                        {errors.password}
                                    </div>
                                    <div align="center">
                                        <button className="siimple-btn siimple-btn--teal siimple-btn--fluid siimple--text-bold"
                                        type="submit">
                                            SignUp
                                        </button>
                                    </div>
                                </div>
                                </form>
                            )
                        }
                    </Formik>
                </div>
                <div align="center">
                    <Link to="/signin" className="siimple-link">ログインはこちら</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUp);