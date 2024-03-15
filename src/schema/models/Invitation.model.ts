import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey, IsAfter, DataType, CreatedAt } from 'sequelize-typescript';
import User from './User.model';
import { Optional } from 'sequelize';
import Event from './Event.model';

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
};

interface InvitationAttributes {
  readonly id: typeof DataType.UUID;
  readonly eventId: typeof DataType.UUID | string;
  readonly invitedBy: typeof DataType.UUID;
  readonly invitedTo: typeof DataType.UUID;
  status: string | InvitationStatus;
  readonly createdAt: Date;

  getInvitedUser(): Promise<User>;
  getInvitedByUser(): Promise<User>;
};

export interface InvitationInput extends Optional<Omit<InvitationAttributes, 'id' | 'createdAt' | 'getInvitedUser' | 'getInvitedByUser'>, 'status'> { }

export interface InvitationOutput extends InvitationAttributes {
  invitedToUser?: User;
 }

@Table({
  timestamps: true,
  paranoid: true,
  modelName: 'Invitation',
  tableName: 'invitations',
  underscored: true,
})
export default class Invitation extends  Model<InvitationAttributes, InvitationInput> implements InvitationAttributes {

  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4
  })
  id!: typeof DataType.UUID;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: InvitationStatus;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.UUID,
  })
  eventId!: typeof DataType.UUID;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  invitedBy!: typeof DataType.UUID;
  
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  invitedTo!: typeof DataType.UUID;

  @CreatedAt
  createdAt!: Date;


  @BelongsTo(() => Event, 'eventId')
  event!: Event;
  
  @BelongsTo(() => User, 'invitedBy')
  invitedByUser!: User;
  
  @BelongsTo(() => User, 'invitedTo')
  invitedToUser!: User;

  public async getInvitedUser(): Promise<User> {
    return this.invitedToUser;
  }
  
  public async getInvitedByUser(): Promise<User> {
    return this.invitedByUser;
  }
};