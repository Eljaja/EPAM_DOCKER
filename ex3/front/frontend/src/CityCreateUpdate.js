import React, {Component} from 'react';
import CityManager from './CityApi';

const cityManager = new CityManager();

class CityCreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:null,
      name:'',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    const {match: {params}} = this.props;
    if(params && params.pk) {
      cityManager.getCity(params.pk).then((c) => {
        this.setState({
          name:c.name,
        })
      })
    }
  }

  handleUpdate(pk){
    cityManager.updateCity({
      "pk": pk,
      "name": this.state.name,
    }).then((result)=>{
        alert("Город отредактирован!");
      }).catch(()=>{
        alert("Ошибка! Проверь форму!");
      });
  }
  
  handleCreate(){
    cityManager.createCity({
      "name": this.state.name,
    }).then((result)=>{
        alert("Город создан!");
      }).catch(()=>{
        alert("Ошибка! Проверь форму!");
      });
  }

  handleSubmit(e){
    const { match: { params } } = this.props;
    if (params && params.pk){
      this.handleUpdate(params.pk);
    }
    else {
      this.handleCreate(params);
    }
    e.preventDefault();
  }

  handleChange(e){
    console.log(this.state);
    this.setState({
        name:e.target.value,
      })
  }

  render() {
    return (
      <div className="container">
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Город</label>
          <input onChange={this.handleChange} id="name" className="form-control" type="text" value={this.state.name}/>
          <input className="btn btn-primary" type="submit" value="Сохранить"/>
        </div>
      </form>
      </div>
    );
  }
}
export default CityCreateUpdate;
